import * as from<%= className %>Reducer from './<%= fileName %>.reducer';
import {
  initial<%= className %>Data,
  get<%= className %>LoadedState,
  get<%= className %>LoadingState,
  get<%= className %>LoadError,
} from './<%= fileName %>.reducer';
import * as from<%= className %>Actions from './<%= fileName %>.actions';

describe('<%= className %>Reducer', () => {

  describe('undefined action', () => {

    it('should return the default initial state', () => {
      const action = {} as any;
      const state = from<%= className %>Reducer.<%= camelizedName %>Reducer(undefined, action);

      expect(state).toEqual(initial<%= className %>Data);
    });
  });

  describe('LOAD_<%= constName %>_SUCCESS', () => {

    it('should set loading, loaded and entities states correctly', () => {

      const payload = { <%= camelizedName %>: [{ id: '1', prop1: 'Test Data' }] };

      const action = new from<%= className %>Actions.Load<%= className %>SuccessAction(payload);
      const state = from<%= className %>Reducer.<%= camelizedName %>Reducer(initial<%= className %>Data, action);

      expect(state.loaded).toEqual(true);
      expect(state.loading).toEqual(false);
      expect(state.errors).toEqual([]);
    });
  });

describe('LOAD_<%= constName %>_FAILURE', () => {

  it('should set loading, loaded and entities states correctly', () => {
    const mockError: any = {
     errors: [{
        code: '12345',
        message: 'errors',
      }]
    };
    const action = new from<%= className %>Actions.Load<%= className %>FailureAction(mockError);
    const state = from<%= className %>Reducer.<%= camelizedName %>Reducer(initial<%= className %>Data, action);

    expect(state.loaded).toEqual(false);
    expect(state.loading).toEqual(false);
    expect(state.errors).toEqual(mockError.errors);
  });
});

  // This testing strategy is based on the ngrx docs https://github.com/ngrx/platform/blob/master/docs/store/testing.md
  describe('selectors', () => {
    describe('get<%= className %>Loading', () => {
      it('should return the loading slice of state', () => {
        expect(get<%= className %>LoadingState.projector(initial<%= className %>Data)).toBe(initial<%= className %>Data.loading);
      });
    });
    describe('get<%= className %>Loaded', () => {
      it('should return the loaded slice of state', () => {
        expect(get<%= className %>LoadedState.projector(initial<%= className %>Data)).toBe(initial<%= className %>Data.loaded);
      });
    });
    describe('get<%= className %>LoadError', () => {
      it('should return the loading slice of state', () => {
        expect(get<%= className %>LoadError.projector(initial<%= className %>Data)).toBe(initial<%= className %>Data.errors);
      });
    });
  });
});