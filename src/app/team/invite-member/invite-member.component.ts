import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";

@Component({
  selector: 'app-invite-member',
  templateUrl: './invite-member.component.html',
  styleUrls: ['./invite-member.component.scss']
})
export class InviteMemberComponent {

  @ViewChild('emailsInput')
  emailsInput: ElementRef;

  emailsToInvite: string[] = [];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(public dialogRef: MatDialogRef<InviteMemberComponent>,
              @Inject(MAT_DIALOG_DATA) public projectId: number) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  remove(email: string) {
    const index = this.emailsToInvite.indexOf(email);
    if (index >= 0) {
      this.emailsToInvite.splice(index, 1);
    }
  }

  addToEmailList(event: MatChipInputEvent) {
    const value = (event.value || '').trim();
    if (value) {
      this.emailsToInvite.push(value);
    }
    this.emailsInput.nativeElement.value = '';
  }
}
