import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Registration} from "./model/registration.model";
import {Login} from "./model/login.model";
import {Observable, of} from "rxjs";
import {delay, map, switchMap} from "rxjs/operators";
import {NotifierService} from "../common/services/notifier.service";
import {faGoogle} from '@fortawesome/free-brands-svg-icons';

let passwordValidatorOpts = [
  Validators.required,
  Validators.minLength(4),
  Validators.maxLength(30)
];

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  openSignUp: boolean;
  usernameOrEmailIsTaken: string;
  googleIcon = faGoogle

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private notifierService: NotifierService) {
    const accessToken = this.activatedRoute.snapshot.queryParams['accessToken'];
    const refreshToken = this.activatedRoute.snapshot.queryParams['refreshToken'];
    const userId = this.activatedRoute.snapshot.queryParams['userId'];

    if (accessToken && refreshToken) {
      this.authService.setUserTokens(accessToken, refreshToken, userId);
    }

    if (this.authService.isAuthenticated()) {
      this.router.navigate(['']);
    }
  }

  registerForm = new FormGroup({
      username: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(15)
        ],
        [this.usernameExistsValidator()]),
      email: new FormControl('', [
          Validators.required,
          Validators.email
        ],
        [this.emailExistsValidator()]
      ),
      password: new FormControl('', passwordValidatorOpts),
      confirmPassword: new FormControl('', [
        Validators.required
      ]),
    },
  );

  loginForm = new FormGroup({
    usernameOrEmail: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    password: new FormControl('', passwordValidatorOpts),
  });

  ngOnInit(): void {
    this.authService.removeAuthorization();
  }

  openSignUpTab() {
    this.openSignUp = true;
    this.loginForm.reset();
  }

  openSignInTab() {
    this.openSignUp = false;
  }

  register() {
    if (this.registerForm.valid) {
      let registrationObject = new Registration().deserialize(this.registerForm.value);

      this.authService.registration(registrationObject).subscribe(
        () => {
          this.loginForm.get("usernameOrEmail").setValue(this.registerForm.get('email').value);

          this.opeSuccessRegistrationSnackBar()
          setTimeout(() => {
            document.getElementById("sign-in-btn").click();
          }, 2000)

          this.registerForm.reset();
        },
        error => {
          console.log(error)
        }
      )
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  get registerUsername() {
    return this.registerForm.get('username');
  }

  get registerEmail() {
    return this.registerForm.get('email');
  }

  get registerPassword() {
    return this.registerForm.get('password');
  }

  get registerConfirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  loginViaGoogle() {
    this.authService.loginViaGoogle();
  }

  login() {
    if (this.loginForm.valid) {
      let loginObject = new Login().deserialize(this.loginForm.value);

      this.authService.login(loginObject).subscribe(
        next => {
          console.log(next);

          this.authService.setUserTokens(next.accessToken, next.refreshToken, String(next.userId));

          setTimeout(() => {
            this.router.navigate(['']);
          }, 100)
        },
        error => {
          console.log(error)
        }
      )
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  get loginUsernameOrEmail() {
    return this.loginForm.get('usernameOrEmail');
  }

  get loginPassword() {
    return this.loginForm.get('password');
  }

  private usernameExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return of(control.value).pipe(
        delay(500),
        switchMap((username) => this.authService.doesUsernameExists(username)
          .pipe(map(usernameExists => usernameExists ? {usernameExists: true} : null)))
      );
    };
  }

  private emailExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return of(control.value).pipe(
        delay(500),
        switchMap((email) => this.authService.doesEmailExists(email)
          .pipe(map(emailExists => emailExists ? {emailExists: true} : null)))
      );
    };
  }

  opeSuccessRegistrationSnackBar() {
    this.notifierService.showSuccessNotification('Successfully registered!', 2000);
  }
}
