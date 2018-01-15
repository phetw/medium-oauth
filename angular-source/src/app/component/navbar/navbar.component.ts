import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  didUserLoggedIn;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.didUserLoggedIn = localStorage.getItem('accessToken') ? true : false;
  }

  logout() {
    this.authService.logout();
  }
}
