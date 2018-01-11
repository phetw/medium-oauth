import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authSerice: AuthService) { }

  ngOnInit() {
  }

  didUserLoggedIn() {
    if (localStorage.getItem('accessToken')) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.authSerice.logout();
  }
}
