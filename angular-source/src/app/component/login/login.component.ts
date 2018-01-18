import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as reducer from '../../reducers/auth.reducer';
import { CHECK_TOKEN_EXPIRE, TEMP_AUTH_CODE_VALID, TEMP_AUTH_CODE_INVALID } from '../../actions/auth.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  tempAuthCode: String;
  subscription: any = {};
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<reducer.State>
  ) { }


  ngOnInit() {
    this.checkIfUrlContainsTempCode();
    if (this.tempAuthCode) {
      this.store.dispatch({ type: TEMP_AUTH_CODE_VALID, payload: { code: this.tempAuthCode } });
      this.subscription.selectStore = this.store.select(fromRoot.reducers.auth).subscribe((data: any) => {
        console.log('Auth store', data.auth);
        if (data.auth.isLoggedIn && !data.auth.didCheckTokenExpire) {
          this.checkTokenExpiry();
        }
      });
    } else {
      this.store.dispatch({ type: TEMP_AUTH_CODE_INVALID, payload: { error: 'Authorizatio code not available' } });
    }
  }

  checkIfUrlContainsTempCode() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['code']) {
        this.tempAuthCode = params['code'];
      }
    });
  }

  checkTokenExpiry() {
    this.store.dispatch({ type: CHECK_TOKEN_EXPIRE });
    this.router.navigate(['/publications']);
  }


  askMediumPermission() {
    const parentWindow = window.open(environment.GET_TEMP_CODE);
    window.close();
  }

  ngOnDestroy() {
    this.subscription.selectStore.unsubscribe();
  }
}
