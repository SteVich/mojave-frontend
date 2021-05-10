import {NgModule} from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthComponent} from './auth/auth.component';
import {MainComponent} from './main/main.component';
import {AuthService} from "./auth/auth.service";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import {AuthGuard} from "./auth/auth.guard";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { NotifierComponent } from './common/components/notifier/notifier.component';
import {MatButtonModule} from "@angular/material/button";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {HeaderComponent} from './common/components/header/header.component';
import {TokenInterceptor} from "./other/interceptors/token.interceptor";
import {ErrorInterceptor} from "./other/interceptors/error.interceptor";
import {DragDropModule} from "@angular/cdk/drag-drop";
import { SideNavComponent } from './common/components/side-nav/side-nav.component';
import { SideNavContentComponent } from './common/components/side-nav-content/side-nav-content.component';
import { TeamComponent } from './team/team.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    MainComponent,
    NotifierComponent,
    HeaderComponent,
    SideNavComponent,
    SideNavContentComponent,
    TeamComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FontAwesomeModule,
    DragDropModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: JWT_OPTIONS, useValue: JWT_OPTIONS
    },
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }