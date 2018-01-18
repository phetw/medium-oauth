import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class PublicationService {

  constructor(
    private http: HttpClient
  ) { }

  getPublications() {
    return this.http.get(environment.API_BASE_URL + '/listPublications', {
      headers: new HttpHeaders()
<<<<<<< Updated upstream
        .set('user_id', JSON.parse(localStorage.getItem('userProfile')).data.id)
        .set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('accessToken')).access_token)
    }).map(res => {
      localStorage.setItem('publicationsList', JSON.stringify(res));
      return res;
=======
        .set('user_id', userId)
    }).map(res => {
      return res['data'];
    }).catch((error: any) => {
      console.error('ERROR', error);
      return Observable.throw(new Error(error.errors));
>>>>>>> Stashed changes
    });
  }
}
