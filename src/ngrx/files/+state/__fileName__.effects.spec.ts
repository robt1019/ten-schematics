import {TestBed} from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import {Actions} from '@ngrx/effects';
import {DataPersistence} from "@nrwl/nx";
import {Observable} from 'rxjs/Observable';
import {empty} from 'rxjs/observable/empty';
import {cold, hot} from 'jasmine-marbles';

import {<%= className %>Effects} from './<%= fileName %>.effects';
import * as from<%= className %> from './<%= fileName %>.actions';

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

describe('<%= fileName %>', () => {
  let actions$: TestActions;
  let effects: <%= className %>Effects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        DataPersistence,
        <%= className %>Effects,
        {
          provide: Actions, useFactory: getActions
        },
      ],
    });

    actions$ = TestBed.get(Actions);
    effects = TestBed.get(<%= className %>Effects);
  });

  describe('load<%= className %>', () => {

    it('should return a Load<%= className %>SuccessAction with the correct payload', () => {
      const action = new from<%= className %>.Load<%= className %>Action();
      const completion = new from<%= className %>.Load<%= className %>SuccessAction(
        { <%= camelizedName %>: { id: '1', prop1: 'Test Data' }}
      );

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });

      expect(effects.load<%= className %>).toBeObservable(expected);
    });
  });
});
