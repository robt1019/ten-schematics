import {
    apply,
    branchAndMerge,
    chain,
    mergeWith,
    move,
    Rule,
    SchematicContext,
    SchematicsException,
    template,
    Tree,
    url
} from '@angular-devkit/schematics';
import { camelize, capitalize, classify, dasherize } from '@angular-devkit/core/src/utils/strings';
import { NgrxOptions } from './schema';
import { normalize } from '@angular-devkit/core';
import * as path from 'path';
import * as ts from 'typescript';
import { Change, InsertChange } from '@schematics/angular/utility/change';
import { addImportToModule, addProviderToModule } from '@nrwl/schematics';
import { insertImport } from '@schematics/angular/utility/route-utils';

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

function insertRootNgrxImports(source: ts.SourceFile, name:string, modulePath: string): Change[] {
    return [
        ...insertBaseNgrxImports(source, modulePath),
        insertImport(
            source,
            modulePath,
            'StoreRouterConnectingModule',
            `@ngrx/router-store`
        ),
        ...addImportToModule(
            source,
            modulePath,
            `StoreModule.forRoot('${camelize(name)}', {} as ActionReducerMap<any>)`
        ),
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
        insertImport(
            source,
            modulePath,
            `${classify(name)}Effects`,
            `./+state/${camelize(name)}.effects`
        ),
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
        ...addProviderToModule(
            source,
            modulePath,
            `${classify(name)}Effects`,
        ),
    ];
}

function addNgrxImportsToNgModule(options: NgrxOptions): Rule {
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

export default function (options: NgrxOptions) {

    const className = classify(options.name);
    const capitalizedName = capitalize(options.name);
    const fileName = dasherize(options.name);
    const camelizedName = camelize(options.name);
    const useEntityAdapter = options.useEntityAdapter;
    const modulePath = options.module ? normalize(options.module) : options.module;

    if (!modulePath) {
        throw new SchematicsException(`module option is required`);
    }

    return (host: Tree, context: SchematicContext) => {

        const templateSource = apply(url('./files'), [
            template({
                useEntityAdapter,
                className,
                capitalizedName,
                fileName,
                camelizedName,
            }),
            move(path.dirname(modulePath)),
        ]);

        if (options.onlyEmptyRoot) {
            return chain([
                branchAndMerge(chain([
                    addNgrxImportsToNgModule(options),
                ])),
            ])(host, context);
        } else {
            return chain([
                branchAndMerge(chain([
                    addNgrxImportsToNgModule(options),
                    mergeWith(templateSource),
                ])),
            ])(host, context);
        }

    }
}