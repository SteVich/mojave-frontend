import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Observable, of} from "rxjs";
import {delay, map, switchMap} from "rxjs/operators";
import {Invite} from "./model/invite.model";
import {TeamService} from "../../service/team.service";
import {NotifierService} from "../../common/services/notifier.service";

@Component({
  selector: 'app-invite-member',
  templateUrl: './invite-member.component.html',
  styleUrls: ['./invite-member.component.scss']
})
export class InviteMemberComponent {

  @ViewChild('emailsInput')
  emailsInput: ElementRef;

  @ViewChild('messageInput')
  messageInput: ElementRef;

  emailForm: FormGroup;

  emailsToInvite: string[] = [];
  message: string;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(public dialogRef: MatDialogRef<InviteMemberComponent>,
              @Inject(MAT_DIALOG_DATA) private projectId: number,
              private teamService: TeamService,
              private notifier: NotifierService) {

    this.emailForm = new FormGroup({
        email: new FormControl('', [
            Validators.required,
            Validators.email
          ],
          [this.emailExistsValidator()]
        ),
      },
    );
  }

  get email() {
    return this.emailForm.get('email');
  }

  onNoClick(): void {
    this.dialogRef.close();
    this.emailsToInvite = [];
  }

  remove(email: string) {
    const index = this.emailsToInvite.indexOf(email);
    if (index >= 0) {
      this.emailsToInvite.splice(index, 1);
    }
  }

  addToEmailList(event: MatChipInputEvent) {
    if (this.emailForm.valid) {
      const value = (event.value || '').trim();
      if (value) {
        this.emailsToInvite.push(value);
      }
      this.emailsInput.nativeElement.value = '';
    }
  }

  private emailExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return of(control.value).pipe(
        delay(500),
        switchMap((email) => this.teamService.doesEmailExists(this.projectId, email)
          .pipe(map(emailExists => emailExists ? {emailExists: true} : null)))
      );
    };
  }

  inviteMembers() {
    if (this.emailsToInvite.length < 1) {
      this.emailForm.markAllAsTouched()
    } else {
      let invite = new Invite(this.emailsToInvite, this.messageInput.nativeElement.value);
      this.teamService.inviteMembers(this.projectId, invite).subscribe((apiResponse) => {
        this.notifier.showSuccessNotification(apiResponse.message, 2000);
        this.dialogRef.close();
        this.emailsToInvite = [];
      })
    }
  }
}
