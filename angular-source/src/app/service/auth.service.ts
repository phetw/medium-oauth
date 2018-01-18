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
    // Use temporary auth code to get 60 days access token
    return this.http.get(environment.API_BASE_URL + '/getAccessToken?code=' + code).map((res) => {
      localStorage.setItem('accessToken', JSON.stringify(res));
      return res;
<<<<<<< Updated upstream
=======
    }).catch((error: any) => {
      console.error('ERROR', error);
      return Observable.throw(new Error(error.errors));
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
      });
  }

=======
      }).catch((error: any) => {
        console.error('ERROR', error);
        return Observable.throw(new Error(error.errors));
      });
  }

  checkTokenExpiry(): Observable<any> {
    const expire_date = new Date(JSON.parse(localStorage.getItem('accessToken'))['expires_at']);
    const current_date = new Date();

    if (current_date >= expire_date) {
      console.log('token is expired');
      return Observable.of(true);
    } else {
      console.log('token is usable');
      return Observable.of(false);
    }
  }

  getNewToken(): Observable<any> {
    return this.http.get(environment.API_BASE_URL + '/refreshToken', {
      headers: new HttpHeaders()
        .set('refresh_token', JSON.parse(localStorage.getItem('accessToken'))['refresh_token'])
    }).map((res) => {
      localStorage.setItem('accessToken', JSON.stringify(res));
      return res;
    }).catch((error: any) => {
      console.error('ERROR', error);
      return Observable.throw(new Error(error.errors));
    });
  }

>>>>>>> Stashed changes
  logout() {
    // Clearing localStorage
    this.router.navigate(['/login']);
    localStorage.clear();
  }
}
