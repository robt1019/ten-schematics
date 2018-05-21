import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import {
  Load<%= className %>Action,
  Load<%= className %>SuccessAction,
  <%= className %>ActionTypes
} from './<%= fileName %>.actions';
import { <%= className %>FeatureStore } from './<%= fileName %>.reducer'

@Injectable()
export class <%= className %>Effects {
  @Effect()
  public load<%= className %> = this.dataPersistence.fetch<Load<%= className %>Action>(
    <%= className %>ActionTypes.LOAD_<%= constName %>,
      {
      run: (action: Load<%= className %>Action, state: <%= className %>FeatureStore) => {
        return new Load<%= className %>SuccessAction({
          <%= camelizedName %>: { id: '1', prop1: 'Test Data' },
        });
      },

      onError: (action: Load<%= className %>Action, error) => {
        console.error('Error', error);
      }
    }
  );

  constructor(
    private actions: Actions,
    private dataPersistence: DataPersistence<<%= className %>FeatureStore>,
  ) {}
}