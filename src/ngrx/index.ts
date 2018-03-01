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

function addImportsToNgModule(options: NgrxOptions): Rule {
    return (host: Tree) => {
        if (!options.module) {
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

        const changes: Change[] = [
            insertImport(
                source,
                modulePath,
                'StoreModule',
                `@ngrx/store`
            ),
            insertImport(
                source,
                modulePath,
                `${camelize(options.name)}Reducer`,
                `./+state/${camelize(options.name)}.reducer`
            ),
            insertImport(
                source,
                modulePath,
                'EffectsModule',
                `@ngrx/effects`
            ),
            insertImport(
                source,
                modulePath,
                `${classify(options.name)}Effects`,
                `./+state/${camelize(options.name)}.effects`
            ),
            ...addImportToModule(
                source,
                modulePath,
                `StoreModule.forFeature('${camelize(options.name)}', {
                    ${camelize(options.name)}: ${camelize(options.name)}Reducer,
                })`,
            ),
            ...addImportToModule(
                source,
                modulePath,
                `EffectsModule.forFeature([${classify(options.name)}Effects])`,
            ),
            ...addProviderToModule(
                source,
                modulePath,
                'ActivitiesEffects',
            ),
        ];

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

        return chain([
            branchAndMerge(chain([
                addImportsToNgModule(options),
                mergeWith(templateSource),
            ])),
        ])(host, context);

    }
}