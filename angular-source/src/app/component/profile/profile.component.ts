import { Component, OnInit, OnDestroy } from '@angular/core';
import { Profile } from '../../model/profile';

import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as reducer from '../../reducers/user.reducer';
import { LOAD_PROFILE } from '../../actions/user.action';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  profile: Profile;
  subscription: any = {};

  constructor(
    private store: Store<reducer.State>
  ) {
    this.profile = reducer.initialState.userProfile;
  }

  ngOnInit() {
    this.checkStore();
    this.store.dispatch({ type: LOAD_PROFILE });
  }

  checkStore() {
    this.subscription.selectStore = this.store.select(fromRoot.reducers.user).subscribe((data: any) => {
      console.log('User store', data.user);
      if (data.user.profileLoaded) {
        this.profile = data.user.userProfile;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.selectStore.unsubscribe();
  }
}
