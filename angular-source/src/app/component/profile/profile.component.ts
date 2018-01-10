import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

export interface Profile {
  id: string;
  imageUrl: string;
  name: string;
  url: string;
  username: string;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: Profile;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    if (JSON.parse(localStorage.getItem('userProfile'))) {
      this.profile = JSON.parse(localStorage.getItem('userProfile'));
    }
  }

  ngOnInit() {
  }

  listPublications() {
    this.router.navigate(['/publications']);
  }

  logout() {
    console.log('Logging out');
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
