import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

export enum <%= classify(name) %>ActionTypes {
    LOAD_DATA = '[<%= classify(name) %>] Load Data',
    LOAD_DATA_FAILURE = '[<%= classify(name) %>] Load Data Failure',
    LOAD_DATA_SUCCESS = '[<%= classify(name) %>] Load Data Success',
}

// payloads should be typed with the data that is being fetched
export class LoadDataAction implements Action {
    readonly type = <%= classify(name) %>ActionTypes.LOAD_DATA;

    constructor(public payload: any) {}
}

export class LoadDataFailureAction implements Action {
    readonly type = <%= classify(name) %>ActionTypes.LOAD_DATA_FAILURE;

    constructor(public payload: HttpErrorResponse | Error) {
        console.error(payload);
    }
}

export class LoadDataSuccessAction implements Action {
    readonly type = <%= classify(name) %>ActionTypes.LOAD_DATA_SUCCESS;

    constructor(public payload: any) {}
}

export type ActivitiesAction =
    LoadDataAction
    | LoadDataFailureAction
    | LoadDataAction;