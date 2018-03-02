import { HttpErrorResponse } from '@angular/common/http';

import * as from<%= className %>Actions from './<%= fileName %>.actions';

describe('<%= className %> Actions', () => {
    describe('LoadData', () => {
        it('should create a LOAD_DATA action', () => {
            const action = new from<%= className %>Actions.LoadDataAction();

            expect({ ...action }).toEqual({
                type: from<%= className %>Actions.<%= className %>ActionTypes.LOAD_DATA,
            });
        });
    });

    describe('LoadDataFailure', () => {
        it('should create a LOAD_DATA_FAILURE action with HttpErrorResponse payload', () => {
            const payload = new HttpErrorResponse({ status: 400 });
            const action = new from<%= className %>Actions.LoadDataFailureAction(payload);

            expect({ ...action }).toEqual({
                type: from<%= className %>Actions.<%= className %>ActionTypes.LOAD_DATA_FAILURE,
                payload,
            });
        });
    });

    describe('LoadDataSuccess', () => {
        it('should create a LOAD_DATA_SUCCESS action with a payload', () => {
            const payload: any = 'Test Data';
            const action = new from<%= className %>Actions.LoadDataSuccessAction(payload);

            expect({ ...action }).toEqual({
                type: from<%= className %>Actions.<%= className %>ActionTypes.LOAD_DATA_SUCCESS,
                payload,
            });
        });
    });
});