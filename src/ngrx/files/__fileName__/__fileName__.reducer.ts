import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { <%= className %>Action, <%= className %>ActionTypes } from './<%= fileName %>.actions';
import { HttpErrorResponse } from '@angular/common/http';

// EntityAdapter should be typed based on data being loaded
const <%= camelizedName %>Adapter: EntityAdapter<any> = createEntityAdapter<any>();

export interface <%= className %>State extends EntityState<any> {
    loading: boolean;
    loaded: boolean;
    error: HttpErrorResponse | Error;
}

export const initial<%= className %>State = <%= camelizedName %>Adapter.getInitialState({
    loading: false,
    loaded: false,
    error: undefined,
});

export function <%= className %>Reducer(state = initial<%= className %>State, action: <%= className %>Action) {

    switch (action.type) {

        case <%= className %>ActionTypes.LOAD_DATA: {
            return <%= camelizedName %>Adapter.removeAll( {
                ...state,
                loading: true,
                loaded: false,
                error: undefined,
            });
        }

        case <%= className %>ActionTypes.LOAD_DATA_SUCCESS: {
            const <%= camelizedName %> = action.payload;
            return <%= camelizedName %>Adapter.addAll(<%= camelizedName %>, {
                ...state,
                loading: false,
                loaded: true,
                error: undefined,
            });
        }

        case <%= className %>ActionTypes.LOAD_DATA_FAILURE: {
            const error = action.payload;
            return <%= camelizedName %>Adapter.removeAll( {
                ...state,
                loading: false,
                loaded: false,
                error
            });
        }

        default:
            return state;
    }
}

export const {
    selectAll: select<%= className %>
} = <%= camelizedName %>Adapter.getSelectors();


export const select<%= className %>Loading = ((state: <%= className %>State) => state.loading);
export const select<%= className %>Loaded = ((state: <%= className %>State) => state.loaded);
export const select<%= className %>LoadError = ((state: <%= className %>State) => state.error);

