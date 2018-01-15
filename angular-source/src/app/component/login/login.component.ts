import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  tempAuthCode: String = '';
  public subscribers: any = {};

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.checkIfUrlContainsTempCode();

    if (this.tempAuthCode) {
      this.subscribers.token = this.authService.requestAccessToken(this.tempAuthCode).subscribe(accessToken => {
        this.subscribers.profile = this.authService.getUserProfile(accessToken).subscribe(() => {
          this.router.navigate(['/publications']);
        });
      });
    }
  }

  checkIfUrlContainsTempCode() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['code']) {
        this.tempAuthCode = params['code'];
      }
    });
  }

  askMediumPermission() {
    const parentWindow = window.open(environment.GET_TEMP_CODE, '_blank');
    window.close();
  }

  ngOnDestroy() {
    // Prevent memory leaks
    this.subscribers.token.unsubscribe();
    this.subscribers.profile.unsubscribe();
  }
}
