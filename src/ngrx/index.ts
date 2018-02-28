import { apply, chain, mergeWith, template, url } from '@angular-devkit/schematics';
import { camelize, capitalize, classify, dasherize } from '@angular-devkit/core/src/utils/strings';
import { NgrxOptions } from './schema';

const stringUtils = { dasherize };

export default function (options: NgrxOptions) {

    const className = classify(options.name);
    const capitalizedName = capitalize(options.name);
    const kebabCaseName = dasherize(options.name);
    const camelizedName = camelize(options.name);

    const templateSource = apply(url('./files'), [
        template({
            ...options,
            ...stringUtils,
            className,
            capitalizedName,
            kebabCaseName,
            camelizedName,
        }),
    ]);

    return chain([mergeWith(templateSource)]);
}