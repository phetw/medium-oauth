import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';



@Injectable()
export class AuthService {
  user_profile: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  requestAccessToken(code) {
    this.http.get(environment.API_BASE_URL + '/getAccessToken?code=' + code).subscribe((res) => {
      if (res) {
        localStorage.setItem('currentUser', JSON.stringify(res));
        console.log('currentUser ', localStorage.getItem('currentUser'));
        this.getUserProfile();
        return true;
      }
    }, (error) => {
      console.log(error);
      return false;
    });
  }

  getUserProfile() {
    this.http.get(environment.API_BASE_URL + '/getUserDetail',
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).access_token)
      }).subscribe(res => {
        this.user_profile = JSON.stringify(res);

        if (this.user_profile) {
          localStorage.setItem('userProfile', JSON.stringify(res));
          console.log('userProfile ', localStorage.getItem('userProfile'));
        }
      });
  }

  logout() {
    // Clearing localStorage

    this.router.navigate(['/login']);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userProfile');
    localStorage.removeItem('publicationsList');
  }
}
