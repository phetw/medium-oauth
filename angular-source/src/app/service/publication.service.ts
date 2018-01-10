import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class PublicationService {

  constructor(
    private http: HttpClient
  ) { }

  getPublications() {
    this.http.get(environment.API_BASE_URL + '/listPublications', {
      headers: new HttpHeaders()
        .set('user_id', JSON.parse(localStorage.getItem('userProfile')).id)
        .set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).access_token)
    }).subscribe(res => {
      console.log('publications list ', res.data);
      localStorage.setItem('publicationsList', JSON.stringify(res.data));
    });
  }
}
