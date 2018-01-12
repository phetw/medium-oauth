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
  ],
  providers: [
    AuthGuard,
    AuthService,
    PublicationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
