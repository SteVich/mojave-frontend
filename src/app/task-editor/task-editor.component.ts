import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from "rxjs";
import {SideNavDirection} from "../common/components/side-nav/side-nav-direction";
import {TaskEditorService} from "../service/task-editor.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "../service/task.service";
import {Assignee} from "../main/models/assignee.model";
import {Milestone} from "../main/models/milestone.model";
import {Tag} from "../main/models/tag.model";
import {Task} from "../main/models/task.model";
import {TaskHistory} from "../main/models/history.model";
import {MainComponent} from "../main/main.component";

@Component({
  selector: 'app-task-editor',
  templateUrl: './task-editor.component.html',
  styleUrls: ['./task-editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskEditorComponent implements OnInit {

  showEditor: Observable<boolean>;

  assignees: Assignee[];
  selectedAssignee: number

  milestones: Milestone[];
  selectedMilestone: number;

  selectedPriority: string;

  tags: Tag[];
  selectedTag: number;

  histories: TaskHistory[] = [];

  taskId: number;

  form: FormGroup;

  constructor(private editorService: TaskEditorService,
              private taskService: TaskService,
              private mainComponent: MainComponent) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
        title: new FormControl('New task', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(120)
        ]),
        assignee: new FormControl('', [Validators.required]),
        milestone: new FormControl('', [Validators.required]),
        estimate: new FormControl('',),
        dueDate: new FormControl('', [Validators.required]),
        priority: new FormControl('MEDIUM'),
        tag: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.maxLength(200)]),
      },
    );

    this.showEditor = this.editorService.getShowEditor();

    this.taskService.getAssignees().subscribe(items => {
      this.assignees = items;
    })

    this.taskService.getMilestones(1).subscribe(items => {
      this.milestones = items;
    })

    this.taskService.getTags(1).subscribe(items => {
      this.tags = items;
    })

    this.editorService.getTaskDataToEdit().subscribe((task) => {
      if (task) {
        console.log(task)
        let title = task.title;
        if (!title) {
          title = "New task"
        }
        this.form.get('title').setValue(title);
        this.form.get('assignee').setValue(task.assignee.id);
        this.form.get('dueDate').setValue(task.dueDate);
        this.form.get('tag').setValue(task.tag.id);
        this.form.get('estimate').setValue(task.estimate);
        this.form.get('milestone').setValue(task.milestone.id);
        this.form.get('priority').setValue(task.priority);
        this.form.get('description').setValue(task.description);
        this.selectedPriority = task.priority;
        this.taskId = task.id;

        this.histories = task.histories;
        if (this.histories != undefined) {
          this.histories.sort((a, b) => a.date.localeCompare(b.date));
        }
      }
    })
  }

  get title() {
    return this.form.get('title');
  }

  get assignee() {
    return this.form.get('assignee');
  }

  get milestone() {
    return this.form.get('milestone');
  }

  get dueDate() {
    return this.form.get('dueDate');
  }

  get estimate() {
    return this.form.get('estimate');
  }

  get priority() {
    return this.form.get('priority');
  }

  get tag() {
    return this.form.get('tag');
  }

  get description() {
    return this.form.get('description');
  }

  getEditorStyle(showNav: boolean) {
    let style: any = {};

    let width = 36;
    style.width = width + 'rem';
    style[SideNavDirection.Right] = (showNav ? 0 : (width * -1)) + 'rem';

    return style;
  }

  onEditorClose() {
    this.editorService.setShowEditor(false);
    this.resetForm();
  }

  textAreaAutoGrow() {
    let textArea = document.getElementById("task-title-input")
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  }

  save() {
    if (this.form.valid) {
      let task = new Task().deserialize(this.form.value)
      let updatedTask = new Task();

      if (this.taskId) {
        this.taskService.edit(task, this.taskId, 1, 1).subscribe(() => {
          console.log(task)
          updatedTask = new Task().deserialize(task);

          setTimeout(() => {
            updatedTask.id = this.taskId;
            this.mainComponent.updateExistingTask(updatedTask);
            this.onEditorClose();
            this.resetForm();
          }, 200)
        })
      } else {
        this.mainComponent.createAndShowNewTask(task);
        setTimeout(() => {
          this.onEditorClose();
          this.resetForm();
        }, 300)

      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  private resetForm() {
    this.form.reset();
    this.histories = [];
    this.form.get('title').setValue("New task");
    this.taskId = null;
  }
}
