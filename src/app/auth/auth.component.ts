import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  openSignUp: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

  openSignUpButton() {
    this.openSignUp = true;
  }

  openSignInButton() {
    this.openSignUp = false;
  }
}
