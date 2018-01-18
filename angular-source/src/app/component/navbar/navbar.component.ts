import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as reducer from '../../reducers/auth.reducer';
import { USER_LOGOUT } from '../../actions/auth.action';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  didUserLoggedIn = false;

  constructor(
    private store: Store<reducer.State>,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.didUserLoggedIn = localStorage.getItem('accessToken') ? true : false;
  }
  logout() {
    this.didUserLoggedIn = false;
    this.store.dispatch({ type: USER_LOGOUT });
    this.authService.logout();
  }
}
