<% if(useEntityAdapter) { %>import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

<% } %>import { <%= className %>Action, <%= className %>ActionTypes } from './<%= fileName %>.actions';
import { HttpErrorResponse } from '@angular/common/http';
<% if(useEntityAdapter) { %>
// EntityAdapter should be typed based on data being loaded
const <%= camelizedName %>Adapter: EntityAdapter<any> = createEntityAdapter<any>();

<% } %>
export interface <%= className %>State <% if(useEntityAdapter) { %> extends EntityState<any><% } %> {<% if(!useEntityAdapter) { %>
    data: any;<% } %>
    loading: boolean;
    loaded: boolean;
    error: HttpErrorResponse | Error | undefined;
}

export const initial<%= className %>State = <% if(useEntityAdapter) { %><%= camelizedName %>Adapter.getInitialState( <% } %> {<% if(!useEntityAdapter) { %>
    data : undefined,<% } %>
    loading: false,
    loaded: false,
    error: undefined,
}<% if(useEntityAdapter) { %>)<% } %>;

export function <%= camelizedName %>Reducer(state = initial<%= className %>State, action: <%= className %>Action) {

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
            const data = action.payload;
            return <% if(useEntityAdapter) { %><%= camelizedName %>Adapter.addAll(<%= camelizedName %>, <% } %>{
                ...state,<% if(!useEntityAdapter) { %>
                data,<% } %>
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
    selectAll: selectData
} = <%= camelizedName %>Adapter.getSelectors();
<% } %>
<% if(!useEntityAdapter) { %>export const selectData = ((state: <%= className %>State) => state.data);
<% } %>export const selectDataLoading = ((state: <%= className %>State) => state.loading);
export const selectDataLoaded = ((state: <%= className %>State) => state.loaded);
export const selectDataLoadError = ((state: <%= className %>State) => state.error);

