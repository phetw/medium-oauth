import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PublicationService {

  constructor(
    private http: HttpClient
  ) { }

  getPublications(userId): Observable<any> {
    return this.http.get(environment.API_BASE_URL + '/listPublications', {
      headers: new HttpHeaders()
        .set('user_id', userId)
        .set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('accessToken')).access_token)
    }).map(res => {
      // localStorage.setItem('publicationList', JSON.stringify(res['data']));
      return res['data'];
    }).catch((error: any) => {
      console.error('ERROR', error);
      return Observable.throw(new Error(error.status));
    });
  }
}
