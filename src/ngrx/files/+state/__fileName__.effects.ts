import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { <%= className %>State } from './<%= fileName %>.reducer';
import { LoadDataAction, LoadDataSuccessAction, <%= className %>ActionTypes } from './<%= fileName %>.actions';

@Injectable()
export class <%= className %>Effects {
@Effect() loadData = this.dataPersistence.fetch(<%= className %>ActionTypes.LOAD_DATA, {
        run: (action: LoadDataAction, state: <%= className %>State) => {
        return new LoadDataSuccessAction('Test Data');
    },

    onError: (action: LoadDataAction, error) => {
        console.error('Error', error);
    }
});

    constructor(private actions: Actions, private dataPersistence: DataPersistence<<%= className %>State>) {}
}