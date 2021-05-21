import {Component, OnInit} from '@angular/core';
import {User} from "../common/models/user.model";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  constructor() {
  }

  members: User[] = [new User(1, "SteVi", ""),
    new User(2, "Ilon", ""),
    new User(2, "Jeff", "")];

  ngOnInit(): void {
  }

}
