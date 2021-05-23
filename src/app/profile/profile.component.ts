import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../service/user.service";
import {AuthService} from "../auth/auth.service";
import {User} from "../common/models/user.model";
import {NotifierService} from "../common/services/notifier.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  currentUser: User = new User();

  constructor(private userService: UserService,
              private notifier: NotifierService) {

    this.profileForm = new FormGroup({
        name: new FormControl('', [
            Validators.required,
            Validators.min(3)
          ]
        ),
        password: new FormControl('', [
            Validators.required,
            Validators.min(4),
          ]
        ),
        confirmPassword: new FormControl('', [
          Validators.required
        ]),
      },
    );

    userService.getCurrentUser().subscribe(user => {
      this.currentUser = user;

      this.profileForm.get('name').setValue(user.name);
    })
  }

  ngOnInit(): void {
  }

  get name() {
    return this.profileForm.get('name');
  }

  get password() {
    return this.profileForm.get('password');
  }

  get confirmPassword() {
    return this.profileForm.get('confirmPassword');
  }

  saveProfileInfo() {
    if (this.profileForm.valid) {
      let request = new User().deserialize(this.profileForm.value);
      this.userService.updateInfo(this.currentUser.id, request).subscribe(apiResponse => {
        this.notifier.showSuccessNotification(apiResponse.message, 2000);
      })
    } else {
      this.profileForm.markAllAsTouched();
    }
  }
}
