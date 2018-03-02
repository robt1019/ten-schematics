import { Tree, VirtualTree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { NgrxOptions } from './schema';
import { createApp, createEmptyWorkspace } from '@nrwl/schematics/src/collection/testing-utils';
import { getFileContent } from '@schematics/angular/utility/test';

describe('Ngrx Schematic', () => {
    const schematicRunner = new SchematicTestRunner(
        'ten-schematics',
        path.join(__dirname, '../collection.json'),
    );
    const defaultOptions: NgrxOptions = {
        name: 'foo',
        module: 'apps/myapp/src/app/app.module.ts',
        useEntityAdapter: false,
        root: false,
        onlyEmptyRoot: false,
        onlyAddFiles: false,
    };

    let appTree: Tree;

    beforeEach(() => {
        appTree = new VirtualTree();
        appTree = createEmptyWorkspace(appTree);
        appTree = createApp(appTree, 'myapp');
    });

    it('should create actions, effects and reducer files in the module\'s +state folder', () => {
        const options = { ...defaultOptions };

        const tree = schematicRunner.runSchematic('ngrx', options, appTree);

        expect(tree.exists('/apps/myapp/src/app/+state/foo.actions.ts')).toBeTruthy();
        expect(tree.exists('/apps/myapp/src/app/+state/foo.effects.ts')).toBeTruthy();
        expect(tree.exists('/apps/myapp/src/app/+state/foo.reducer.ts')).toBeTruthy();
    });

    it('should add StoreModule.forFeature and EffectsModule.forFeature to app.module', () => {
        const options = { ...defaultOptions };
        const tree = schematicRunner.runSchematic('ngrx', options, appTree);

        const appModule = getFileContent(tree, '/apps/myapp/src/app/app.module.ts');
        expect(appModule).toContain('StoreModule.forFeature');
        expect(appModule).toContain('EffectsModule.forFeature');
    });

    it('should create files but not change module if onlyAddFiles flag is passed', () => {

        const options = { ...defaultOptions, onlyAddFiles: true };
        const tree = schematicRunner.runSchematic('ngrx', options, appTree);

        const appModule = getFileContent(tree, '/apps/myapp/src/app/app.module.ts');
        expect(appModule).not.toContain('StoreModule');
        expect(tree.exists('/apps/myapp/src/app/+state/foo.actions.ts')).toBeTruthy();
    });

    it('should add StoreModule.forRoot and EffectModule.forRoot to app.module if root flag passed', () => {

        const options = { ...defaultOptions, root: true };
        const tree = schematicRunner.runSchematic('ngrx', options, appTree);

        const appModule = getFileContent(tree, '/apps/myapp/src/app/app.module.ts');
        expect(appModule).toContain('StoreModule.forRoot');
        expect(appModule).toContain('EffectsModule.forRoot');
        expect(tree.exists('/apps/myapp/src/app/+state/foo.actions.ts')).toBeTruthy();
    });

    it('should add empty root to module with no files if onlyEmptyRoot flag passed', () => {

        const options = { ...defaultOptions, onlyEmptyRoot: true };
        const tree = schematicRunner.runSchematic('ngrx', options, appTree);

        const appModule = getFileContent(tree, '/apps/myapp/src/app/app.module.ts');
        expect(appModule).toContain('StoreModule.forRoot');
        expect(appModule).toContain('EffectsModule.forRoot');
        expect(tree.exists('/apps/myapp/scr/app/+state/foo.actions.ts')).toBeFalsy();
    });
});