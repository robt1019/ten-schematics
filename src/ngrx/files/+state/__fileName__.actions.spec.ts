import * as from<%= className %>Actions from './<%= fileName %>.actions';
import { <%= className %> } from './<%= fileName %>.reducer';

describe('<%= className %> Actions', () => {
  describe('LoadData', () => {
    it('should create a LOAD_<%= constName %> action', () => {
      const action = new from<%= className %>Actions.Load<%= className %>Action();

      expect({ ...action }).toEqual({
          type: from<%= className %>Actions.<%= className %>ActionTypes.LOAD_<%= constName %>,
       });
    });
  });

  describe('Load<%= className %>Failure', () => {
    it('should create a LOAD_<%= constName %>_FAILURE action with any errors[] payload', () => {
      const payload: any = [];
      const action = new from<%= className %>Actions.Load<%= className %>FailureAction(payload);

      expect({ ...action }).toEqual({
        type: from<%= className %>Actions.<%= className %>ActionTypes.LOAD_<%= constName %>_FAILURE,
        payload,
      });
    });
  });

  describe('Load<%= className %>Success', () => {
    it('should create a LOAD_<%= constName %>_SUCCESS action with a payload', () => {
      const payload = { <%= camelizedName %>: { id: '1', prop1: 'Test Data' } };
      const action = new from<%= className %>Actions.Load<%= className %>SuccessAction(payload);

      expect({ ...action }).toEqual({
        type: from<%= className %>Actions.<%= className %>ActionTypes.LOAD_<%= constName %>_SUCCESS,
        payload,
      });
    });
  });
});