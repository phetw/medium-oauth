import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';


@Injectable()
export class AccessTokenHttpInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req.clone({});
        const accessToken = JSON.parse(localStorage.getItem('accessToken'));

        if (accessToken) {
            authReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken')).access_token}`
                }
            });
        }
        return next.handle(authReq).catch((error, caught) => {
            console.log('Error Occurred');
            console.log(error);
            return Observable.throw(error);
        });
    }
}
