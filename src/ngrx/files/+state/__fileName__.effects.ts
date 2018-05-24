import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import {
  Load<%= className %>Action,
  Load<%= className %>SuccessAction,
  Load<%= className %>FailureAction,
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
          <%= camelizedName %>: [{ id: '1', prop1: 'Test Data' }],
        });
      },

      onError: (action: Load<%= className %>Action, error) => {
        return new Load<%= className %>FailureAction({ error })
      }
    }
  );

  constructor(
    private dataPersistence: DataPersistence<<%= className %>FeatureStore>,
  ) {}
}