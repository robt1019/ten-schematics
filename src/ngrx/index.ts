import { apply, chain, mergeWith, template, url } from '@angular-devkit/schematics';
import { classify, dasherize } from '@angular-devkit/core/src/utils/strings';
import { NgrxOptions } from './schema';

const stringUtils = {dasherize, classify};

export default function (options: NgrxOptions) {

    const templateSource = apply(url('./files'), [
        template({
            ...stringUtils,
            ...options,
        }),
    ]);

    return chain([mergeWith(templateSource)]);
}