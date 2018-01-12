import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  didUserLoggedIn = localStorage.getItem('accessToken') ? true : false;

  constructor(private authSerice: AuthService) { }

  logout() {
    this.authSerice.logout();
  }
}
