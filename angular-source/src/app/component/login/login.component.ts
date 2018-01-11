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
  urlContainsTempCode: Boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
  ) { }



  ngOnInit() {
    this.checkIfUrlContainsTempCode();

    if (this.urlContainsTempCode) {
      this.activatedRoute.queryParams.subscribe(params => {
        console.log('requesting at');
        this.authService.requestAccessToken(params['code']).subscribe(accessToken => {
          console.log('access token is here ' + JSON.stringify(accessToken));
          this.authService.getUserProfile(accessToken).subscribe((user) => {
            console.log('profile is here ' + JSON.stringify(user));
            this.router.navigate(['/publications']);
          });
        });
      });
    } else {
      // Do nothing until user sign in with Medium
    }
  }

  checkIfUrlContainsTempCode() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['code']) {
        console.log('url contains code');
        this.urlContainsTempCode = true;
      } else {
        console.log('url does not contain code');
      }
    });
  }

  askMediumPermission() {
    const parentWindow = window.open(this.REQUEST_TEMP_AUTH_CODE_API, '_blank');
    window.close();
  }
}
