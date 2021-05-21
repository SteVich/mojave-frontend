import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from "../common/models/user.model";
import {TeamService} from "../service/team.service";
import {NotifierService} from "../common/services/notifier.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmComponent} from "../common/components/confirm/confirm.component";
import {InviteMemberComponent} from "./invite-member/invite-member.component";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  projectId: number;
  members: User[] = [];
  selectedRole: string;
  roles: string[] = ['PM', 'DEV', 'QA']

  constructor(private teamService: TeamService,
              private notifier: NotifierService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.projectId = Number(localStorage.getItem('projectId'));

    this.teamService.getTeamMembers().subscribe(members => {
      this.members = members;
    })
  }

  removeMemberFromProject(member: User) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '586px',
      data: "Are you sure you want to remove this member from the project?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.teamService.removeMember(member.id, this.projectId).subscribe(apiResponse => {
          const index = this.members.indexOf(member);
          if (index >= 0) {
            this.members.splice(index, 1);
          }
          this.notifier.showSuccessNotification(apiResponse.message, 2000)
        })
      }
    })
  }

  setNewRole(id: number, role: string) {
    this.teamService.saveRole(id, role).subscribe(apiResponse => {
      this.notifier.showSuccessNotification(apiResponse.message, 2000)
    })
  }

  addMembers() {
    const dialogRef = this.dialog.open(InviteMemberComponent, {
      width: '580px',
      data: this.projectId
    });
  }
}
