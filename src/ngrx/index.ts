import {
    apply,
    branchAndMerge,
    chain,
    mergeWith,
    move,
    SchematicContext,
    SchematicsException,
    Source,
    template,
    Tree,
    url
} from '@angular-devkit/schematics';
import { camelize, capitalize, classify, dasherize } from '@angular-devkit/core/src/utils/strings';
import { NgrxOptions } from './schema';
import { normalize } from '@angular-devkit/core';
import * as path from 'path';
import { addNgrxImportsToNgModule } from './utils/file-utils';

function setupNgrxTemplate(options: NgrxOptions): Source {

    const className = classify(options.name);
    const capitalizedName = capitalize(options.name);
    const fileName = dasherize(options.name);
    const camelizedName = camelize(options.name);
    const useEntityAdapter = options.useEntityAdapter;

   return apply(url('./files'), [
        template({
            useEntityAdapter,
            className,
            capitalizedName,
            fileName,
            camelizedName,
        }),
        move(path.dirname(options.module)),
    ]);
}

function addModuleImports(options: NgrxOptions, host: Tree, context: SchematicContext) {
    return chain([
        branchAndMerge(chain([
            addNgrxImportsToNgModule(options),
        ])),
    ])(host, context);
}

function addModuleImportsAndGenerateFiles(options: NgrxOptions, host: Tree, context: SchematicContext) {

    const templateSource = setupNgrxTemplate(options);

    return chain([
        branchAndMerge(chain([
            addNgrxImportsToNgModule(options),
            mergeWith(templateSource),
        ])),
    ])(host, context);
}

export default function (options: NgrxOptions): any {

    const modulePath = options.module ? normalize(options.module) : options.module;

    if (!modulePath) {
        throw new SchematicsException(`module option is required`);
    }

    return (host: Tree, context: SchematicContext) => {

        if (options.onlyEmptyRoot) {
            return addModuleImports(options, host, context);
        } else {
            return addModuleImportsAndGenerateFiles(options, host, context);
        }
    }
}