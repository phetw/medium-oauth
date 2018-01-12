import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

import { Profile } from '../../model/profile';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  profile: Profile;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    if (JSON.parse(localStorage.getItem('userProfile'))) {
      this.profile = JSON.parse(localStorage.getItem('userProfile')).data;
    }
  }
}
