import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Publication } from '../../model/publication';

import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as reducer from '../../reducers/publication.reducer';
import { LOAD_PUBLICATION } from '../../actions/publication.action';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit, OnDestroy {

  public publications: Publication[];
  public subscription: any = {};

  constructor(
    private store: Store<reducer.State>
  ) {
    this.publications = reducer.initialState.publicationList;
  }

  ngOnInit() {
    this.store.dispatch({ type: LOAD_PUBLICATION });
    this.checkStore();
  }

  checkStore() {
    this.subscription.selectStore = this.store.select(fromRoot.reducers.publication).subscribe((data: any) => {
      console.log('Pub store', data.publication);
      if (data.user.profileLoaded && data.publication.publicationLoaded) {
        this.publications = JSON.parse(localStorage.getItem('publicationList'));
      }
    });
  }

  ngOnDestroy() {
    this.subscription.selectStore.unsubscribe();
  }
}
