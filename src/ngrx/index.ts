import { apply, chain, mergeWith, move, SchematicsException, template, url } from '@angular-devkit/schematics';
import { camelize, capitalize, classify, dasherize } from '@angular-devkit/core/src/utils/strings';
import { NgrxOptions } from './schema';
import { normalize } from '@angular-devkit/core';
import * as path from 'path';

export default function (options: NgrxOptions) {

    const className = classify(options.name);
    const capitalizedName = capitalize(options.name);
    const fileName = dasherize(options.name);
    const camelizedName = camelize(options.name);
    const useEntityAdapter = options.useEntityAdapter;
    const modulePath = options.module ? normalize(options.module) : options.module;

    if(!modulePath) {
        throw new SchematicsException(`module option is required`);
    }

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

    return chain([mergeWith(templateSource)]);
}