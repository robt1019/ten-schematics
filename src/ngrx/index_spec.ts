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
    };

    let appTree: Tree;

    beforeEach(() => {
        appTree = new VirtualTree();
        appTree = createEmptyWorkspace(appTree);
        appTree = createApp(appTree, 'myapp');
    });

    it('should create actions, effects and reducer file in the module\'s +state folder', () => {
        const options = { ...defaultOptions };

        const tree = schematicRunner.runSchematic('ngrx', options, appTree);
        const files = tree.files;
        expect(files.indexOf('/apps/myapp/src/app/+state/foo.actions.ts')).toBeGreaterThanOrEqual(0);
        expect(files.indexOf('/apps/myapp/src/app/+state/foo.effects.ts')).toBeGreaterThanOrEqual(0);
        expect(files.indexOf('/apps/myapp/src/app/+state/foo.reducer.ts')).toBeGreaterThanOrEqual(0);
    });

    it('should add StoreModule.forFeature and EffectsModule.forFeature to app.module', () => {
        const options = { ...defaultOptions };
        const tree = schematicRunner.runSchematic('ngrx', options, appTree);

        const appModule = getFileContent(tree, '/apps/myapp/src/app/app.module.ts');
        expect(appModule).toContain('StoreModule.forFeature');
        expect(appModule).toContain('EffectsModule.forFeature');
    });

});