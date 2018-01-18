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
import * as reducer from '../reducers/index';

@Injectable()
export class PublicationEffects {

    constructor(
        private publicationService: PublicationService,
        private actions$: Actions,
        private store: Store<reducer.IndexState>
    ) { }

    @Effect()
    loadPublicationList$: Observable<Action> = this.actions$
        .ofType(act.LOAD_PUBLICATION)
        .withLatestFrom(this.store)
        .mergeMap((data) => {
            return this.publicationService.getPublications(data[1].user.userProfile.id)
                .map((publicationList) => new act.LoadPublicationSuccess({ data: publicationList }))
                .catch((error) => {
                    return [new act.LoadPublicationFailed({ error: error })];
                });
        });
}
