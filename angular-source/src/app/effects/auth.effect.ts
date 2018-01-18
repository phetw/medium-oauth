import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { AuthService } from '../service/auth.service';
import * as act from '../actions/auth.action';
import * as reducer from '../reducers/auth.reducer';
import { error } from 'selenium-webdriver';


@Injectable()
export class AuthEffects {

    constructor(
        private authService: AuthService,
        private actions$: Actions,
        private store: Store<reducer.State>
    ) { }

    @Effect()
    getTemporaryToken$: Observable<Action> = this.actions$
        .ofType(act.TEMP_AUTH_CODE_VALID)
        .switchMap((data: any) =>
            this.authService.requestAccessToken(data.payload.code).map(() => new act.UserLoginSuccess())
        ).catch((err) => {
            return [new act.UserLoginFailed({ error: err })];
        });

    @Effect()
    checkTokenExpiry$: Observable<Action> = this.actions$
        .ofType(act.CHECK_TOKEN_EXPIRE)
        .switchMap(() =>
            this.authService.checkTokenExpiry().map((result) => {
                if (!result) {
                    return new act.AccessTokenValid();
                } else {
                    return new act.AccessTokenExpired();
                }
            })
        );
}
