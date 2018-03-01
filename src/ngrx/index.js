"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const strings_1 = require("@angular-devkit/core/src/utils/strings");
function default_1(options) {
    const className = strings_1.classify(options.name);
    const capitalizedName = strings_1.capitalize(options.name);
    const fileName = strings_1.dasherize(options.name);
    const camelizedName = strings_1.camelize(options.name);
    const useEntityAdapter = options.useEntityAdapter;
    const templateSource = schematics_1.apply(schematics_1.url('./files'), [
        schematics_1.template({
            useEntityAdapter,
            className,
            capitalizedName,
            fileName,
            camelizedName,
        }),
    ]);
    return schematics_1.chain([schematics_1.mergeWith(templateSource)]);
}
exports.default = default_1;
//# sourceMappingURL=index.js.map