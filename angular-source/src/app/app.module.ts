import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { ProfileComponent } from './component/profile/profile.component';
import { PublicationsComponent } from './component/publications/publications.component';
import { NavbarComponent } from './component/navbar/navbar.component';

import { AppRouter } from './route/route';

// Services
import { AuthService } from './service/auth.service';
import { PublicationService } from './service/publication.service';

import { AuthGuard } from './guard/auth.guard';

// Store
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers/index';
import { EffectsModule } from '@ngrx/effects';

// Effects
import { AuthEffects } from './effects/auth.effect';
import { UserEffects } from './effects/user.effect';
import { PublicationEffects } from './effects/publication.effect';

// Angular material lib
import {
  MatToolbarModule,
  MatMenuModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatIconModule,
  MatListModule,
} from '@angular/material';
import { Effect } from '@ngrx/effects/src/effects_metadata';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    PublicationsComponent,
    NavbarComponent,
  ],
  imports: [
    AppRouter,
    BrowserModule,
    HttpClientModule,
    NgHttpLoaderModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      AuthEffects,
      UserEffects,
      PublicationEffects,
    ])
  ],
  providers: [
    AuthGuard,
    AuthService,
    PublicationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
