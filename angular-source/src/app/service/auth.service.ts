import { Injectable } from '@angular/core';
import { Router, Params } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthService {
  user_profile: string;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  requestAccessToken(code) {
    return this.http.get(environment.API_BASE_URL + '/getAccessToken?code=' + code).map((res) => {
      localStorage.setItem('accessToken', JSON.stringify(res));
      return res;
    });
  }

  getUserProfile(accessToken) {
    return this.http.get(environment.API_BASE_URL + '/getUserDetail',
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + accessToken.access_token)
      }).map((res) => {
        localStorage.setItem('userProfile', JSON.stringify(res));
        return res;
      });
  }

  checkTokenExpiry(): Boolean {
    const expire_date = new Date(JSON.parse(localStorage.getItem('accessToken'))['expires_at']);
    const current_date = new Date();

    if (current_date >= expire_date) {
      console.log('token is expired');
      return true;
    } else {
      console.log('token is usable');
      return false;
    }
  }

  getNewToken(refreshToken) {
    return this.http.get(environment.API_BASE_URL + '/refreshToken', {
      headers: new HttpHeaders()
        .set('refresh_token', refreshToken)
    }).map((res) => {
      localStorage.setItem('accessToken', JSON.stringify(res));
      return res;
    });
  }

  logout() {
    this.router.navigate(['/login']);
    localStorage.clear();
  }
}
