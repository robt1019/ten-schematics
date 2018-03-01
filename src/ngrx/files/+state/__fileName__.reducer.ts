<% if(useEntityAdapter) { %>import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

<% } %>import { <%= className %>Action, <%= className %>ActionTypes } from './<%= fileName %>.actions';
import { HttpErrorResponse } from '@angular/common/http';
<% if(useEntityAdapter) { %>
// EntityAdapter should be typed based on data being loaded
const <%= camelizedName %>Adapter: EntityAdapter<any> = createEntityAdapter<any>();

<% } %>
export interface <%= className %>State <% if(useEntityAdapter) { %> extends EntityState<any><% } %> {<% if(!useEntityAdapter) { %>
    <%= className %>: any;<% } %>
    loading: boolean;
    loaded: boolean;
    error: HttpErrorResponse | Error;
}

export const initial<%= className %>State = <% if(useEntityAdapter) { %><%= camelizedName %>Adapter.getInitialState( <% } %> {<% if(!useEntityAdapter) { %>
    <%= className %>: undefined,<% } %>
    loading: false,
    loaded: false,
    error: undefined,
}<% if(useEntityAdapter) { %>)<% } %>;

export function <%= fileName %>Reducer(state = initial<%= className %>State, action: <%= className %>Action) {

    switch (action.type) {

        case <%= className %>ActionTypes.LOAD_DATA: {
            return <% if(useEntityAdapter) { %><%= camelizedName %>Adapter.removeAll( <% } %>{
                ...state,
                loading: true,
                loaded: false,
                error: undefined,
            }<% if(useEntityAdapter) { %>)<% } %>;
        }

        case <%= className %>ActionTypes.LOAD_DATA_SUCCESS: {
            const <%= camelizedName %> = action.payload;
            return <% if(useEntityAdapter) { %><%= camelizedName %>Adapter.addAll(<%= camelizedName %>, <% } %>{
                ...state,<% if(!useEntityAdapter) { %>
                <%= camelizedName %>,<% } %>
                loading: false,
                loaded: true,
                error: undefined,
            }<% if(useEntityAdapter) { %>)<% } %>;
        }

        case <%= className %>ActionTypes.LOAD_DATA_FAILURE: {
            const error = action.payload;
            return <% if(useEntityAdapter) { %><%= camelizedName %>Adapter.removeAll( <% } %>{
                ...state,
                loading: false,
                loaded: false,
                error
            }<% if(useEntityAdapter) { %>)<% } %>;
        }

        default:
            return state;
    }
}
<% if(useEntityAdapter) { %>export const {
    selectAll: select<%= className %>
} = <%= camelizedName %>Adapter.getSelectors();
<% } %>
<% if(!useEntityAdapter) { %>export const select<%= className %> = ((state: <%= className %>State) => state.<%= className %>);
<% } %>export const select<%= className %>Loading = ((state: <%= className %>State) => state.loading);
export const select<%= className %>Loaded = ((state: <%= className %>State) => state.loaded);
export const select<%= className %>LoadError = ((state: <%= className %>State) => state.error);

