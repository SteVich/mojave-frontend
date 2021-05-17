import {Component, OnInit} from '@angular/core';
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {Router} from "@angular/router";
import {Milestone} from "../main/models/milestone.model";

class Fruit {
  name: string
}

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  milestones: Milestone[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      let milestone = new Milestone();
      milestone.name = value;
      this.milestones.push(milestone);
    }

    // Clear the input value
  }

  remove(milestone: Milestone): void {
    const index = this.milestones.indexOf(milestone);
    if (index >= 0) {
      this.milestones.splice(index, 1);
    }
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}

