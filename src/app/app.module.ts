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
import {NotifierComponent} from './common/components/notifier/notifier.component';
import {MatButtonModule} from "@angular/material/button";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {HeaderComponent} from './common/components/header/header.component';
import {TokenInterceptor} from "./other/interceptors/token.interceptor";
import {ErrorInterceptor} from "./other/interceptors/error.interceptor";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {SideNavComponent} from './common/components/side-nav/side-nav.component';
import {SideNavContentComponent} from './common/components/side-nav-content/side-nav-content.component';
import {TeamComponent} from './team/team.component';
import {TaskEditorComponent} from './task-editor/task-editor.component';
import {AutosizeModule} from "ngx-autosize";
import {NgSelectModule} from "@ng-select/ng-select";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatSliderModule} from "@angular/material/slider";
import {MatRadioModule} from "@angular/material/radio";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatNativeDateModule, MatRippleModule} from "@angular/material/core";
import {MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatTooltipModule} from "@angular/material/tooltip";
import {ConfirmComponent} from "./common/components/confirm/confirm.component";
import {MatDialogModule} from "@angular/material/dialog";
import {HomeComponent} from './home/home.component';
import {ProjectComponent} from './project/project.component';
import {ColorPickerModule} from "ngx-color-picker";
import {InviteMemberComponent} from './team/invite-member/invite-member.component';
import {ProfileComponent} from './profile/profile.component';
import {LoaderComponent} from './common/components/loader/loader.component';

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
    TaskEditorComponent,
    ConfirmComponent,
    HomeComponent,
    ProjectComponent,
    InviteMemberComponent,
    ProfileComponent,
    LoaderComponent,
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
    DragDropModule,
    AutosizeModule,
    NgSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatNativeDateModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatRippleModule,
    MatMenuModule,
    MatTooltipModule,
    MatDialogModule,
    ColorPickerModule
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
