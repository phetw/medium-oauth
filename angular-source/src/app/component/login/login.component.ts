import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  scope = 'basicProfile,listPublications';
  // tslint:disable-next-line:max-line-length
  REQUEST_TEMP_AUTH_CODE_API = 'https://medium.com/m/oauth/authorize?' + 'client_id=' + environment.API_SECRET.clientId + '&scope=' + this.scope + '&state=state&response_type=code&redirect_uri=' + environment.redirectUri;

  constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['code']) {
        this.requestAccessToken(params['code']);
        console.log('Has temporary code');
      }
    });
  }

  requestTemporaryAuthCode() {
    const parentWindow = window.open(this.REQUEST_TEMP_AUTH_CODE_API, '_blank');
    // TODO
    window.close();
  }

  requestAccessToken(code) {
    this.http.get(environment.API_BASE_URL + '/getAccessToken?code=' + code).subscribe(data => {
      console.log(data.access_token);
      localStorage.setItem('access_token', data.access_token);
    });
  }

}
