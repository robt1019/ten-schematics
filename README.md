# ten-group schematics

This repository contains custom Angular schematics for generating specific boilerplate code for an Angular Nrwl Nx application, using the Angular CLI.

Currently it only has a schematic for generating ngrx code (actions, reducer and effects files along with spec files).

### Installation:

`npm install --save-dev @ten-group/schematics`

### Usage:

`ng generate ngrx --collection=@ten-group/schematics <name> <module> <options ...>`

If you don't currently have an Angular Nrwl Nx project and want to try the schematics out, follow the quick start guide here:

https://github.com/nrwl/nx

cd into the newly created workspace folder and run: 

`npm install`

`npm install --save-dev @ten-group/schematics`

then run `ng generate ngrx --collection=@ten-group/schematics user --module=src/app/app.module.ts --root`

This should generate you a `+state` folder with a root level ngrx store in it.

### Required

- name (string). Name of the state model (without "State" suffix).

- module (string). Path to an Angular module.

### Options

- useEntityAdapter. Use an entity adapter inside reducer created. (e.g. --useEntityAdapter)
- root (boolean). Add StoreModule.forRoot and EffectsModule.forRoot instead of forFeature (e.g., --root).
- onlyEmptyRoot (boolean). Do not generate any files. Only generate StoreModule.forRoot and EffectsModule.forRoot (e.g., --onlyEmptyRoot).
- onlyAddFiles (boolean). Only add new NgRx files, without changing the module file (e.g., --onlyAddFiles).

### Unit Testing

`npm run test` will run the unit tests, using Jasmine as a runner and test framework.
