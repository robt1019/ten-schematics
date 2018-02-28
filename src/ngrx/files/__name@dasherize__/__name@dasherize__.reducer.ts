import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { <%= classify(name) %>Action, <%= classify(name) %>ActionTypes } from './<%= dasherize(name) %>.action';
import { HttpErrorResponse } from '@angular/common/http';

// EntityAdapter should be typed based on data being loaded
const <%= camelize(name) %>Adapter: EntityAdapter<any> = createEntityAdapter<any>();

export interface <%= classify(name) %>State extends EntityState<any> {
    loading: boolean;
    loaded: boolean;
    error: HttpErrorResponse | Error;
}

export const initial<%= classify(name) %>State = <%= camelize(name) %>Adapter.getInitialState({
    loading: false,
    loaded: false,
    error: undefined,
});

export function <%= classify(name) %>Reducer(state = initial<%= classify(name) %>State, action: <%= classify(name) %>Action) {

    switch (action.type) {

        case <%= classify(name) %>ActionTypes.LOAD_DATA: {
            return <%= camelize(name) %>Adapter.removeAll( {
                ...state,
                loading: true,
                loaded: false,
                error: undefined,
            });
        }

        case <%= classify(name) %>ActionTypes.LOAD_DATA_SUCCESS: {
            const <%= camelize(name) %> = action.payload;
            return <%= camelize(name) %>Adapter.addAll(<%= camelize(name) %>, {
                ...state,
                loading: false,
                loaded: true,
                error: undefined,
            });
        }

        case <%= classify(name) %>ActionTypes.LOAD_DATA_FAILURE: {
            const error = action.payload;
            return <%= camelize(name) %>Adapter.removeAll( {
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
    selectAll: select<%= classify(name) %>
} = <%= camelize(name) %>Adapter.getSelectors();


export const select<%= classify(name) %>Loading = ((state: <%= classify(name) %>State) => state.loading);
export const select<%= classify(name) %>Loaded = ((state: <%= classify(name) %>State) => state.loaded);
export const select<%= classify(name) %>LoadError = ((state: <%= classify(name) %>State) => state.error);

