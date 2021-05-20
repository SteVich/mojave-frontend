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

  projectId: number;

  project: Project = new Project();
  selectable = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  milestones: Milestone[] = [];
  tags: Tag[] = [];

  imageForm: FormGroup;
  titleForm: FormGroup;

  isMilestoneCreated: boolean = true;
  isTagCreated: boolean = true;

  constructor(private router: Router,
              private projectService: ProjectService,
              private notifier: NotifierService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.projectId = Number(localStorage.getItem('projectId'));

    this.imageForm = new FormGroup({
      imageUrl: new FormControl('', [Validators.pattern("(http|ftp|https)://([\\w_-]+(?:(?:\\.[\\w_-]+)+))([\\w.,@?^=%&:/~+#-]*[\\w@?^=%&/~+#-])?")])
    });
    this.titleForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.min(2)])
    });

    this.projectService.getProject(this.projectId).subscribe(project => {
      this.project = project;
      this.milestones = project.milestones;
      this.tags = project.tags;

      project.tags.forEach(tag => {
        this.chipsBackgroundMap.set(tag.id, tag.color);
      })
      this.imageForm.get('imageUrl').setValue(project.imageUrl);
      this.titleForm.get('name').setValue(project.name);
    }, error => {
    })
  }

  get imageUrl() {
    return this.imageForm.get('imageUrl');
  }

  get title() {
    return this.titleForm.get('name');
  }

  addMilestone(event: MatChipInputEvent): void {
    const value = this.titleCaseWord((event.value || '').trim());
    if (value) {
      let milestone = new Milestone();
      milestone.name = value;
      if (this.project.id) {
        this.projectService.saveProjectMilestone(this.project.id, value).subscribe((createdId) => {
          milestone.id = createdId;

          this.isMilestoneCreated = true;
        });
      }
      this.project.milestones.push(milestone);
      this.milestones.push(milestone);
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
        if (this.project.id) {
          this.projectService.deleteProjectMilestone(this.project.id, milestone.id).subscribe((response) => {
            this.notifier.showSuccessNotification(response.message, 2000);
          });
        }
        const index = this.milestones.indexOf(milestone);
        if (index >= 0) {
          this.milestones.splice(index, 1);
        }
      }
    });
  }

  // todo: important: add filter on board page
  // todo: need to filter tasks by milestones.

  addTag(event: MatChipInputEvent): void {
    const value = this.titleCaseWord((event.value || '').trim());

    let colors = ['#0764ef', '#2fdb11', '#efeb07', '#ef0707', '#6007ef', '#07efef', '#ef7f07', '#282e93', '#ef07c8'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    if (value) {
      let tag = new Tag();
      tag.name = value;
      tag.color = randomColor;
      if (this.project.id) {
        this.projectService.saveProjectTag(this.project.id, value, randomColor).subscribe((createdId) => {
          tag.id = createdId;
          this.isTagCreated = true;
        });
      }
      this.chipsBackgroundMap.set(tag.id, tag.color);
      this.project.tags.push(tag);
      this.tags.push(tag);
    }
    this.tagInput.nativeElement.value = '';
  }

  removeTag(tag: Tag): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '400px',
      data: "Are you sure you want to delete this tag?"
    });
    dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (this.project.id) {
            this.projectService.deleteProjectTag(this.project.id, tag.id).subscribe((response) => {
                this.notifier.showSuccessNotification(response.message, 2000);
              }
            )
          }
          const index = this.tags.indexOf(tag);
          if (index >= 0) {
            this.tags.splice(index, 1);
          }
        }
      }
    );
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

  saveProjectName() {
    if (this.titleForm.valid) {
      let name = this.titleCaseWord(this.title.value);
      if (this.project.id) {
        this.projectService.saveProjectName(this.project.id, name).subscribe()
      } else {
        this.project.name = name;
      }
    } else {
      this.titleForm.markAllAsTouched();
    }
  }

  saveProjectDescription(event: any) {
    let description = this.titleCaseWord(event.target.value);
    if (this.project.id) {
      this.projectService.saveProjectDescription(this.project.id, description).subscribe()
    } else {
      this.project.description = description;
    }
  }

  saveProjectImageUrl() {
    if (this.imageForm.valid) {
      if (this.project.id) {
        this.projectService.saveProjectImageUrl(this.project.id, this.imageUrl.value).subscribe()
      } else {
        this.project.imageUrl = this.imageUrl.value;
      }
    } else {
      this.imageForm.markAllAsTouched();
    }
  }

  saveTagColor(value: string, tag: Tag) {
    tag.color = value;
    this.chipsBackgroundMap.set(tag.id, tag.color);
    this.projectService.updateProjectColor(tag.id, value).subscribe()
  }

  createNewProject() {
    if (this.titleForm.valid) {
      if (this.milestones.length == 0) {
        this.isMilestoneCreated = false;
      } else if (this.tags.length == 0) {
        this.isTagCreated = false
      } else {
        this.projectService.createProject(this.project).subscribe(savedProject => {
          this.notifier.showSuccessNotification("Project was successfully created", 2000);
          localStorage.setItem('projectId', String(savedProject.id))
          this.router.navigate([''])
        });
      }
    } else {
      this.titleForm.markAllAsTouched();
    }
  }

  titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1);
  }
}

