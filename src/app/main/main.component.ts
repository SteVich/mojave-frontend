import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Board} from "./models/board.model";
import {Column} from "./models/column.model";
import {TaskEditorService} from "../service/task-editor.service";
import {Task} from "./models/task.model";
import {BoardService} from "../service/board.service";


@Component({
  selector: 'app-main-view',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  board: Board;
  isColumnTitleEditableMap: Map<number, boolean> = new Map();

  constructor(private taskEditorService: TaskEditorService,
              private boardService: BoardService) {
  }

  ngOnInit() {
    let projectId = 1;
    this.boardService.getDefaultForProject(projectId).subscribe((board) => {
      this.board = board;
    }, (error => {
      console.log(error)
    }));
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  openAddTaskEditor() {
    this.taskEditorService.setShowEditor(true);
  }

  openEditTaskEditor(task: Task) {
    this.taskEditorService.setTaskDataToEdit(task);
    this.taskEditorService.setShowEditor(true);
  }

  public setTaskInfo(task: Task) {
    this.board.columns[0].tasks.push(task)
  }

  addColumn() {
    this.board.columns.push(new Column(4, "New section", []))
  }

  makeColumnTitleEditable(id: number) {
    this.isColumnTitleEditableMap.set(id, true);
  }

  makeColumnTitleNotEditable(id: number) {
    setTimeout(() => {
      this.isColumnTitleEditableMap.set(id, false);
    }, 300)
  }

  saveTitle(id, value: string) {
    this.board.columns[id - 1].name = value;
    setTimeout(() => {
      this.isColumnTitleEditableMap.set(id, false);
    }, 300)
  }
}
