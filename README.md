# ten-group schematics

This repository contains extensions to the @nrwl/schematics to support any custom schematics needed by ten-group.

It currently only overrides the `ngrx` command, to better support our architecture for ngrx, which is inspired by Todd Motto's course [https://ultimateangular.com/ngrx-store-effects](https://ultimateangular.com/ngrx-store-effects).

All other nrwl schematics are left as detailed here [https://nrwl.io/nx](https://nrwl.io/nx).

All existing nrwl schematic commands are supported as deatiled here [https://nrwl.io/nx/guide-setting-up-ngrx](https://nrwl.io/nx) are supported.

In addition, there is a --useEntityAdapter flag which will use an entityAdapter in the generated reducer file

### Usage:

`ng generate ngrx <command> --collection=@ten-group/schematics`
 
or amend `.angular-cli.json` to use `@ten-group/schematics` instead of the default.

### Unit Testing

`npm run test` will run the unit tests, using Jasmine as a runner and test framework.

### Publishing

To publish any changes to the repository under the ten-group npm package, simply do:

```bash
npm run build
npm publish
```

You will need to be added to the @ten-group npm organisation to update the package
 