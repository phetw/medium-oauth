import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';


import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { AuthService } from '../service/auth.service';
import * as userAction from '../actions/user.action';
import * as publicationAction from '../actions/publication.action';

import * as reducer from '../reducers/user.reducer';

@Injectable()
export class UserEffects {

    constructor(
        private authService: AuthService,
        private actions$: Actions,
        private store: Store<reducer.State>
    ) { }

    @Effect()
    loadUserProfile$: Observable<Action> = this.actions$
        .ofType(userAction.LOAD_PROFILE)
        .switchMap(() =>
            this.authService.getUserProfile().map((userProfile) => userProfile)
        ).mergeMap((data) => {
            return [new userAction.LoadProfileSuccess({ data: data }), new publicationAction.LoadPublication()];
        }).catch((error) => {
            return [new userAction.LoadProfileFailed({ error: error })];
        });
}
