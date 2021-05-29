import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {User} from "../common/models/user.model";
import {TeamService} from "../service/team.service";
import {NotifierService} from "../common/services/notifier.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmComponent} from "../common/components/confirm/confirm.component";
import {InviteMemberComponent} from "./invite-member/invite-member.component";
import {MatMenuTrigger} from "@angular/material/menu";
import {Role} from "../auth/model/role.model";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  projectId: number;
  members: User[] = [];
  selectedRole: string;
  roles: string[] = ['PM', 'DEV', 'QA']
  role: string = 'ROLE_DEVELOPER';

  constructor(private teamService: TeamService,
              private notifier: NotifierService,
              private dialog: MatDialog,
              private jwtHelper: JwtHelperService) {
  }

  ngOnInit(): void {
    this.projectId = Number(localStorage.getItem('projectId'));

    const token = localStorage.getItem('accessToken');
    this.jwtHelper.decodeToken(token).roles
      .filter(roleObject => roleObject.projectId == this.projectId)
      .forEach(roleObject => this.role = roleObject.role);

    this.teamService.getTeamMembers(this.projectId).subscribe(members => {
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
    this.teamService.saveRole(this.projectId, id, role).subscribe(apiResponse => {
      this.notifier.showSuccessNotification(apiResponse.message, 2000);
    });
    this.trigger.closeMenu();
  }

  addMembers() {
    this.dialog.open(InviteMemberComponent, {
      width: '580px',
      data: this.projectId
    });
  }
}
