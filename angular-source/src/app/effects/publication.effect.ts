import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/withLatestFrom';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, } from '@ngrx/effects';
import { PublicationService } from '../service/publication.service';
import * as act from '../actions/publication.action';
import * as reducer from '../reducers/user.reducer';
import { LOAD_PUBLICATION_FAILED } from '../actions/publication.action';

@Injectable()
export class PublicationEffects {

    constructor(
        private publicationService: PublicationService,
        private actions$: Actions,
        private store: Store<reducer.State>
    ) { }

    @Effect()
    loadPublicationList$: Observable<Action> = this.actions$
        .ofType(act.LOAD_PUBLICATION)
        .withLatestFrom(this.store)
        // tslint:disable-next-line:no-shadowed-variable
        .mergeMap(([Action, reducer]) => {
            console.log('reducer', reducer);
            return this.publicationService.getPublications('127c2f13924ca124c7fb3e68c6ddb0c87fb9c906a98f8af03cba3256104287be7')
                .map((publicationList) => new act.LoadPublicationSuccess({ data: publicationList }))
                .catch((error) => {
                    return [new act.LoadPublicationFailed({ error: error })];
                });
        });
}
