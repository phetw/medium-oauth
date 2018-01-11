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
        .set('user_id', JSON.parse(localStorage.getItem('userProfile')).data.id)
        .set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).access_token)
    }).subscribe(res => {
      localStorage.setItem('publicationsList', JSON.stringify(res));

      console.log('publicationList', localStorage.getItem('publicationsList'), 2);
    });
  }
}
