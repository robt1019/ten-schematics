import * as ts from 'typescript';
import { insertImport } from '@schematics/angular/utility/route-utils';
import * as ngAstUtils from '@schematics/angular/utility/ast-utils';
import { camelize, classify, dasherize } from '@angular-devkit/core/src/utils/strings';
import { Change, InsertChange } from '@schematics/angular/utility/change';
import { addImportToModule } from '@nrwl/schematics';
import { Rule, SchematicsException, Tree } from '@angular-devkit/schematics';
import { NgrxOptions } from '../schema';

function insertBaseNgrxImports(source: ts.SourceFile, modulePath: string): Change[] {
    return [
        insertImport(
            source,
            modulePath,
            'StoreModule',
            `@ngrx/store`
        ),
        insertImport(
            source,
            modulePath,
            `ActionReducerMap`,
            `@ngrx/store`
        ),
        insertImport(
            source,
            modulePath,
            'EffectsModule',
            `@ngrx/effects`
        ),
    ]
}

function insertBaseNgrxFeatureRootImports(source: ts.SourceFile, name: string, modulePath: string): Change[] {
    return [
        ...ngAstUtils.addProviderToModule(
            source,
            modulePath,
            `${classify(name)}Effects`,
            `./+state/${dasherize(name)}.effects`,
        ),
    ]
}

function insertBaseRootNgrxImports(source: ts.SourceFile, name: string, modulePath: string): Change[] {
    return [
        ...insertBaseNgrxImports(source, modulePath),
        ...addImportToModule(
            source,
            modulePath,
            `StoreModule.forRoot('${camelize(name)}', {} as ActionReducerMap<any>)`
        ),
    ]
}

function insertRootNgrxImports(source: ts.SourceFile, name: string, modulePath: string): Change[] {
    return [
        ...insertBaseNgrxFeatureRootImports(source, name, modulePath),
        ...insertBaseRootNgrxImports(source, name, modulePath),
        ...addImportToModule(
            source,
            modulePath,
            `EffectsModule.forRoot([${classify(name)}Effects])`
        ),
    ];
}

function insertOnlyEmptyRootNgrxImports(source: ts.SourceFile, name: string, modulePath: string): Change[] {
    return [
        ...insertBaseNgrxImports(source, modulePath),
        ...addImportToModule(
            source,
            modulePath,
            `StoreModule.forRoot('${camelize(name)}', {} as ActionReducerMap<any>)`
        ),
        ...addImportToModule(
            source,
            modulePath,
            `EffectsModule.forRoot([])`
        ),
    ];
}

function insertFeatureNgrxImports(source: ts.SourceFile, name: string, modulePath: string): Change[] {
    return [
        ...insertBaseNgrxImports(source, modulePath),
        ...insertBaseNgrxFeatureRootImports(source, name, modulePath),
        ...addImportToModule(
            source,
            modulePath,
            `StoreModule.forFeature('${camelize(name)}', {} as ActionReducerMap<any>)`,
        ),
        ...addImportToModule(
            source,
            modulePath,
            `EffectsModule.forFeature([${classify(name)}Effects])`,
        ),
    ];
}

export function addNgrxImportsToNgModule(options: NgrxOptions): Rule {
    return (host: Tree) => {

        if (options.onlyAddFiles) {
            return host;
        }

        const modulePath = options.module;
        if (!host.exists(options.module)) {
            throw new Error('Specified module does not exist');
        }

        const text = host.read(modulePath);
        if (text === null) {
            throw new SchematicsException(`File ${modulePath} does not exist.`);
        }
        const sourceText = text.toString('utf-8');

        const source: ts.SourceFile = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);

        let changes: Change[];

        if (options.onlyEmptyRoot) {
            changes = insertOnlyEmptyRootNgrxImports(source, options.name, modulePath);
        }
        else if (options.root) {
            changes = insertRootNgrxImports(source, options.name, modulePath);
        }
        else {
            changes = insertFeatureNgrxImports(source, options.name, modulePath);
        }

        const recorder = host.beginUpdate(modulePath);

        for (const change of changes) {
            if (change instanceof InsertChange) {
                recorder.insertLeft(change.pos, change.toAdd);
            }
        }

        host.commitUpdate(recorder);

        return host;
    };
}