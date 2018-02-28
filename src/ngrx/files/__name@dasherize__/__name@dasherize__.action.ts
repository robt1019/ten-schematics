import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

export enum <%= className %>ActionTypes {
    LOAD_DATA = '[<%= className %>] Load Data',
    LOAD_DATA_FAILURE = '[<%= className %>] Load Data Failure',
    LOAD_DATA_SUCCESS = '[<%= className %>] Load Data Success',
}

// payloads should be typed with the data that is being fetched
export class LoadDataAction implements Action {
    readonly type = <%= className %>ActionTypes.LOAD_DATA;

    constructor(public payload: any) {}
}

export class LoadDataFailureAction implements Action {
    readonly type = <%= className %>ActionTypes.LOAD_DATA_FAILURE;

    constructor(public payload: HttpErrorResponse | Error) {
        console.error(payload);
    }
}

export class LoadDataSuccessAction implements Action {
    readonly type = <%= className %>ActionTypes.LOAD_DATA_SUCCESS;

    constructor(public payload: any) {}
}

export type <%= className %>Action =
    LoadDataAction
    | LoadDataFailureAction
    | LoadDataSuccessAction;