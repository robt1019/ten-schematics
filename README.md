# ten-group schematics

This repository contains schematics for generating boilerplate code needed by ten-group.

Currently it only has a schematic for generating ngrx code.

### Usage:

`ng generate ngrx --collection=@ten-group/schematics <name> <module> <options ...>`

### Required
- name (string)
Name of the state model (without "State" suffix).

- module (string)
Path to an Angular module.

### Options

- entityAdapter
Create reducer using entityAdapter. (e.g. --entityAdapter)
- root (boolean)
Add StoreModule.forRoot and EffectsModule.forRoot instead of forFeature (e.g., --root).
- onlyEmptyRoot (boolean)
Do not generate any files. Only generate StoreModule.forRoot and EffectsModule.forRoot (e.g., --onlyEmptyRoot).
- onlyAddFiles (boolean)
Only add new NgRx files, without changing the module file (e.g., --onlyAddFiles).

### Unit Testing

`npm run test` will run the unit tests, using Jasmine as a runner and test framework.
