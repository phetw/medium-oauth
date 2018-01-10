import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { AuthService } from '../../service/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  scope = 'basicProfile,listPublications';
  // tslint:disable-next-line:max-line-length
  REQUEST_TEMP_AUTH_CODE_API = 'https://medium.com/m/oauth/authorize?' + 'client_id=' + environment.API_SECRET.clientId + '&scope=' + this.scope + '&state=state&response_type=code&redirect_uri=' + environment.redirectUri;
  temporaryAuthCode: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    if (!this.temporaryAuthCode) {
      console.log('There is no access token');
      this.extractTemporaryCode();
      this.authService.requestAccessToken(this.temporaryAuthCode);

      if (localStorage.getItem('currentUser')) {
        this.router.navigate(['/profile']);
      }
    } else {
      this.router.navigate(['/profile']);
    }
  }

  extractTemporaryCode() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.temporaryAuthCode = params['code'];
    });
  }

  askMediumPermission() {
    // TODO : Check if access_token already exist
    const parentWindow = window.open(this.REQUEST_TEMP_AUTH_CODE_API, '_blank');
    // TODO : close child window
    window.close();
  }



}
