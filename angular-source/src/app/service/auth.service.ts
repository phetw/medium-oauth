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

  logout() {
    // Clearing localStorage
    this.router.navigate(['/login']);
    localStorage.clear();
  }
}
