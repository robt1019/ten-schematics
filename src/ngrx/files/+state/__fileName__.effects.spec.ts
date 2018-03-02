import {TestBed} from '@angular/core/testing';
import {HttpErrorResponse} from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import {Actions} from '@ngrx/effects';
import {DataPersistence} from "@nrwl/nx";
import {Observable} from 'rxjs/Observable';
import {empty} from 'rxjs/observable/empty';
import {cold, hot} from 'jasmine-marbles';

import {<%= className %>Effects} from './<%= fileName %>.effects';
import * as from<%= className %> from './<%= fileName %>.actions';

const mockHttpErrorResponse = new HttpErrorResponse({});

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

    describe('loadData', () => {

        it('should return a LoadDataSuccessAction with the correct payload', () => {
            const action = new from<%= className %>.LoadDataAction('Test Data');
            const completion = new from<%= className %>.LoadDataSuccessAction('Test Data');

            actions$.stream = hot('-a', { a: action });
            const expected = cold('-c', { c: completion });

            expect(effects.loadData).toBeObservable(expected);
        });
    });
});
