<% if(useEntityAdapter) { %>import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
<% } %>import { createFeatureSelector, createSelector } from '@ngrx/store';

import { <%= className %>Action, <%= className %>ActionTypes } from './<%= fileName %>.actions';
<% if(useEntityAdapter) { %>
const <%= camelizedName %>Adapter: EntityAdapter<<%= className %>> = createEntityAdapter<<%= className %>>();
<% } %>
// Entity type. This should be moved to its own file
export interface <%= className %> {
  id: string;
  prop1: any;
}

// The name under which we register this NgRx feature store
// inside of this feature's module.ts file.
export const <%= camelizedName %>FeatureStoreName = '<%= camelizedName %>';

// Highest level interface for this feature store.
export interface <%= className %>FeatureStore {
  [<%= camelizedName %>FeatureStoreName]: <%= className %>State;
}

export interface <%= className %>State <% if(useEntityAdapter) { %> extends EntityState<any><% } %> {<% if(!useEntityAdapter) { %>
  <%= camelizedName %><% if(useEntityAdapter) { %>[]<% } %>: any;<% } %>
  loading: boolean;
  loaded: boolean;
  errors: any[];
}

export const initial<%= className %>Data = <% if(useEntityAdapter) { %><%= camelizedName %>Adapter.getInitialState( <% } %> {<% if(!useEntityAdapter) { %>
  <%= camelizedName %>: undefined,<% } %>
  loading: false,
  loaded: false,
  errors: [],
}<% if(useEntityAdapter) { %>)<% } %>;

export function <%= camelizedName %>Reducer(
  state = initial<%= className %>Data,
  action: <%= className %>Action,
): <%= className %>State {
  switch (action.type) {
    case <%= className %>ActionTypes.LOAD_<%= constName %>: {
      return <% if(useEntityAdapter) { %><%= camelizedName %>Adapter.removeAll( <% } %>{
        ...state,
        loading: true,
        errors: [],
      }<% if(useEntityAdapter) { %>)<% } %>;
    }

    case <%= className %>ActionTypes.LOAD_<%= constName %>_SUCCESS: {
      return <% if(useEntityAdapter) { %><%= camelizedName %>Adapter.addAll(
        action.payload.<%= camelizedName %>,
        <% } %>{
      ...state,<% if(!useEntityAdapter) { %>
      <%= camelizedName %>: action.payload.<%= camelizedName %>,<% } %>
        loading: false,
        loaded: true,
        errors: [],
      }<% if(useEntityAdapter) { %>)<% } %>;
    }

    case <%= className %>ActionTypes.LOAD_<%= constName %>_FAILURE: {
      return <% if(useEntityAdapter) { %><%= camelizedName %>Adapter.removeAll( <% } %>{
        ...state,
        loading: false,
        loaded: false,
        errors: action.payload.errors
      }<% if(useEntityAdapter) { %>)<% } %>;
    }

    default:
      return state;
  }
}

/**
 * Feature store selector
 */
export const get<%= className %>FeatureState = createFeatureSelector<<%= className %>State>(
  <%= camelizedName %>FeatureStoreName,
);
<% if(useEntityAdapter) { %>export const {
  selectAll: selectData
} = <%= camelizedName %>Adapter.getSelectors();
<% } %>
<% if(!useEntityAdapter) { %>export const get<%= className %> = createSelector(
  get<%= className %>FeatureState,
  (state: <%= className %>State) => state.<%= camelizedName %>,
);
<% } %>export const get<%= className %>LoadingState = createSelector(
  get<%= className %>FeatureState,
  (state: <%= className %>State) => state.loading
);
export const get<%= className %>LoadedState = createSelector(
  get<%= className %>FeatureState,
  (state: <%= className %>State) => state.loaded
);
export const get<%= className %>LoadError = createSelector(
  get<%= className %>FeatureState,
  (state: <%= className %>State) => state.errors
);

