import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {Task} from "../main/models/task.model";

@Injectable({
  providedIn: 'root'
})
export class TaskEditorService implements OnInit {

  private showEditor: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private task: BehaviorSubject<Task> = new BehaviorSubject<Task>(new Task());

  constructor(private router: Router) {
    router.events.subscribe(() => {
      this.setShowEditor(false);
    });
  }

  ngOnInit() {
  }

  getShowEditor() {
    return this.showEditor.asObservable();
  }

  setShowEditor(showHide: boolean) {
    this.showEditor.next(showHide);
  }

  getTaskDataToEdit() {
    return this.task.asObservable();
  }

  setTaskDataToEdit(task: Task) {
    this.task.next(task);
  }

  toggleState() {
    this.showEditor.next(!this.showEditor.value);
  }

  isOpen() {
    return this.showEditor.value;
  }
}
