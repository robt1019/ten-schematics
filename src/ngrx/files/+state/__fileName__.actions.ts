import { Action } from '@ngrx/store';

import { <%= className %> } from './<%= fileName %>.reducer'

export enum <%= className %>ActionTypes {
  LOAD_<%= constName %> = '[<%= className %>] Load <%= fileName %>',
  LOAD_<%= constName %>_FAILURE = '[<%= className %>] Load <%= fileName %> Failure',
  LOAD_<%= constName %>_SUCCESS = '[<%= className %>] Load <%= fileName %> Success',
}

export class Load<%= className %>Action implements Action {
  public readonly type = <%= className %>ActionTypes.LOAD_<%= constName %>;
}

export class Load<%= className %>FailureAction implements Action {
  public readonly type = <%= className %>ActionTypes.LOAD_<%= constName %>_FAILURE;

  constructor(public payload: { errors: any }) {}
}

export class Load<%= className %>SuccessAction implements Action {
  public readonly type = <%= className %>ActionTypes.LOAD_<%= constName %>_SUCCESS;

  constructor(public payload: { <%= camelizedName %>: <%= className %><% if(useEntityAdapter) { %>[]<% } %> }) {}
}

export type <%= className %>Action =
  | Load<%= className %>Action
  | Load<%= className %>FailureAction
  | Load<%= className %>SuccessAction;