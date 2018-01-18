import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';


import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { AuthService } from '../service/auth.service';
import * as act from '../actions/user.action';
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
        .ofType(act.LOAD_PROFILE)
        .switchMap(() =>
            this.authService.getUserProfile().map((userProfile) => new act.LoadProfileSuccess({ data: userProfile }))
        ).catch((error) => {
            return [new act.LoadProfileFailed({ error: error })];
        });
}
