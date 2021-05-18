import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {Router} from "@angular/router";
import {Milestone} from "../main/models/milestone.model";
import {ProjectService} from "../service/project.service";
import {Project} from "../common/models/project.model";
import {Tag} from "../main/models/tag.model";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  @ViewChild("milestoneInput")
  milestoneInput: ElementRef;

  @ViewChild("tagInput")
  tagInput: ElementRef;

  projectId: number = 1;

  project: Project;
  selectable = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  milestones: Milestone[] = [];
  tags: Tag[] = [];

  constructor(private router: Router, private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.projectService.getProject(this.projectId).subscribe(project => {
      this.project = project;
      this.milestones = project.milestones;
      this.tags = project.tags;
    })
  }

  addMilestone(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.projectService.saveProjectMilestone(this.project.id, value).subscribe(() => {
        let milestone = new Milestone();
        milestone.name = value;
        this.milestones.push(milestone);
      });
    }
    this.milestoneInput.nativeElement.value = ''
  }

  removeMilestone(milestone: Milestone): void {
    const index = this.milestones.indexOf(milestone);
    if (index >= 0) {
      this.milestones.splice(index, 1);
    }

    // todo: validate if this milestone exists in tasks.
    // todo: need to filter tasks by milestones.
    // todo: important: add filter on board page
  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.projectService.saveProjectTag(this.project.id, value).subscribe(() => {
        let tag = new Tag();
        tag.name = value;
        this.tags.push(tag);
      });
    }
    this.tagInput.nativeElement.value = ''
  }

  removeTag(tag: Tag): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

  saveProjectName(value) {
    this.projectService.saveProjectName(this.project.id, value).subscribe()
  }

  saveProjectDescription(value) {
    this.projectService.saveProjectDescription(this.project.id, value).subscribe()
  }

  saveProjectImageUrl(value) {
    this.projectService.saveProjectImageUrl(this.project.id, value).subscribe()
  }

  saveTagColor(value: string, tag: Tag) {
    tag.color = value;
    this.projectService.updateProjectTag(tag).subscribe()
  }

}

