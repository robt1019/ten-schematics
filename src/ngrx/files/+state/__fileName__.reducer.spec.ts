import {HttpErrorResponse} from "@angular/common/http";

import * as from<%= className %>Reducer from './<%= fileName %>.reducer';
import { initial<%= className %>State, selectDataLoaded, selectDataLoadError, selectDataLoading } from './<%= fileName %>.reducer';
import * as from<%= className %>Actions from './<%= fileName %>.actions';

describe('<%= className %>Reducer', () => {

    describe('undefined action', () => {

        it('should return the default initial state', () => {
            const action = {} as any;
            const state = from<%= className %>Reducer.<%= fileName %>Reducer(undefined, action);

            expect(state).toEqual(initial<%= className %>State);
        });
    });

    describe('LOAD_DATA_SUCCESS', () => {

        it('should set loading, loaded and entities states correctly', () => {
            const action = new from<%= className %>Actions.LoadDataAction('Test Data');
            const state = from<%= className %>Reducer.<%= fileName %>Reducer(initial<%= className %>State, action);

            expect(state.loaded).toEqual(false);
            expect(state.loading).toEqual(true);
            expect(state.error).toEqual(undefined);
        });
    });

    describe('LOAD_DATA_FAILURE', () => {

        it('should set loading, loaded and entities states correctly', () => {
            const mockError = new HttpErrorResponse({});
            const action = new from<%= className %>Actions.LoadDataFailureAction(mockError);
            const state = from<%= className %>Reducer.<%= fileName %>Reducer(initial<%= className %>State, action);

            expect(state.loaded).toEqual(false);
            expect(state.loading).toEqual(false);
            expect(state.error).toEqual(mockError);
        });
    });

    describe('selectors', () => {
        describe('selectDataLoading', () => {
            it('should return the loading slice of state', () => {
                expect(selectDataLoading(initial<%= className %>State)).toBe(initial<%= className %>State.loading);
            });
        });
        describe('select<%= fileName %>Loaded', () => {
            it('should return the loaded slice of state', () => {
                expect(selectDataLoaded(initial<%= className %>State)).toBe(initial<%= className %>State.loaded);
            });
        });
        describe('select<%= fileName %>LoadError', () => {
            it('should return the loading slice of state', () => {
                expect(selectDataLoadError(initial<%= className %>State)).toBe(initial<%= className %>State.error);
            });
        });
    });
});