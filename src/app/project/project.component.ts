import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {Router} from "@angular/router";
import {Milestone} from "../main/models/milestone.model";
import {ProjectService} from "../service/project.service";
import {Project} from "../common/models/project.model";
import {Tag} from "../main/models/tag.model";
import {NotifierService} from "../common/services/notifier.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmComponent} from "../common/components/confirm/confirm.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  @ViewChild("milestoneInput")
  milestoneInput: ElementRef;

  @ViewChild("milestoneInput")
  tagList: ElementRef;

  @ViewChild("tagInput")
  tagInput: ElementRef;

  chipsBackgroundMap: Map<number, string> = new Map();

  projectId: number = 1;

  project: Project; //todo add project init here
  selectable = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  milestones: Milestone[] = [];
  tags: Tag[] = [];

  imageForm: FormGroup;

  constructor(private router: Router,
              private projectService: ProjectService,
              private notifier: NotifierService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.imageForm = new FormGroup({
      imageUrl: new FormControl('', [Validators.pattern("(http|ftp|https)://([\\w_-]+(?:(?:\\.[\\w_-]+)+))([\\w.,@?^=%&:/~+#-]*[\\w@?^=%&/~+#-])?")])
    });

    this.projectService.getProject(this.projectId).subscribe(project => {
      this.project = project;
      this.milestones = project.milestones;
      this.tags = project.tags;

      project.tags.forEach(tag => {
        this.chipsBackgroundMap.set(tag.id, tag.color);
      })

      this.imageForm.get('imageUrl').setValue(project.imageUrl);
      console.log(this.chipsBackgroundMap)
    })
  }

  get imageUrl() {
    return this.imageForm.get('imageUrl');
  }

  addMilestone(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.projectService.saveProjectMilestone(this.project.id, value).subscribe((createdId) => {
        let milestone = new Milestone();
        milestone.name = value;
        milestone.id = createdId;
        this.milestones.push(milestone);
      });
    }
    this.milestoneInput.nativeElement.value = '';
  }

  removeMilestone(milestone: Milestone): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '400px',
      data: "Are you sure you want to delete this milestone?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectService.deleteProjectMilestone(this.project.id, milestone.id).subscribe((response) => {
          if (response.success) {
            const index = this.milestones.indexOf(milestone);
            if (index >= 0) {
              this.milestones.splice(index, 1);
            }
          }
          this.notifier.showSuccessNotification(response.message, 2000);
        });
      }
    });
  }

  // todo: important: add filter on board page
  // todo: need to filter tasks by milestones.

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    let colors = ['#0764ef', '#2fdb11', '#efeb07', '#ef0707', '#6007ef', '#07efef', '#ef7f07', '#282e93', '#ef07c8'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    if (value) {
      this.projectService.saveProjectTag(this.project.id, value, randomColor).subscribe((createdId) => {
        let tag = new Tag();
        tag.id = createdId;
        tag.name = value;
        tag.color = randomColor;

        this.chipsBackgroundMap.set(tag.id, tag.color);
        this.tags.push(tag);
      });
    }
    this.tagInput.nativeElement.value = ''
  }

  removeTag(tag: Tag): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '400px',
      data: "Are you sure you want to delete this tag?"
    });
    dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.projectService.deleteProjectTag(this.project.id, tag.id).subscribe((response) => {
              if (response.success) {
                const index = this.tags.indexOf(tag);
                if (index >= 0) {
                  this.tags.splice(index, 1);
                }
              }
              this.notifier.showSuccessNotification(response.message, 2000);
            }
          )
        }
      }
    );
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

  saveProjectImageUrl() {
    if (this.imageForm.valid) {
      this.projectService.saveProjectImageUrl(this.project.id, this.imageUrl.value).subscribe()
    } else {
      this.imageForm.markAllAsTouched();
    }
  }

  saveTagColor(value: string, tag: Tag) {
    tag.color = value;
    this.chipsBackgroundMap.set(tag.id, tag.color);
    this.projectService.updateProjectColor(tag.id, value).subscribe()
  }

}

