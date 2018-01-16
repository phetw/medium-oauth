import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    try {
      if (JSON.parse(localStorage.getItem('accessToken'))['access_token']) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      this.router.navigate(['/login']);
      return false;
    }

  }
}
