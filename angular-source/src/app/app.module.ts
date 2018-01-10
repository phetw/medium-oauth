import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { ProfileComponent } from './component/profile/profile.component';
import { PublicationsComponent } from './component/publications/publications.component';

import { AppRouter } from './route/route';

// Services
import { AuthService } from './service/auth.service';
import { PublicationService } from './service/publication.service';

import { AuthGuard } from './guard/auth.guard';

import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    PublicationsComponent,
  ],
  imports: [
    AppRouter,
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
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
