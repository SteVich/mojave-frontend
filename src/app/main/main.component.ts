import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Board} from "./models/board.model";
import {Column} from "./models/column.model";
import {TaskEditorService} from "../service/task-editor.service";
import {Task} from "./models/task.model";
import {BoardService} from "../service/board.service";
import {TaskService} from "../service/task.service";
import {BoardColumnService} from "../service/board-column.service";
import {NotifierService} from "../common/services/notifier.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmComponent} from "../common/components/confirm/confirm.component";


@Component({
  selector: 'app-main-view',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  board: Board = new Board();
  isColumnTitleEditableMap: Map<number, boolean> = new Map();
  isAddNewSectionHidden: boolean = false;

  constructor(private taskEditorService: TaskEditorService,
              private boardService: BoardService,
              private taskService: TaskService,
              private boardColumnService: BoardColumnService,
              private notifierService: NotifierService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    let projectId = 1;
    this.boardService.getDefaultForProject(projectId).subscribe((board) => {
      this.board = board;
    }, (error => {
      console.log(error)
    }));
  }

  drop(event: CdkDragDrop<Task[]>, columnId: number) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      let taskIds = [];
      event.container.data.map(task => {
        taskIds.push(task.id)
      })

      this.taskService.changeTasksPositionsInColumn(taskIds, 1, columnId).subscribe(() => {
      })
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      let taskId = event.container.data[event.currentIndex].id
      this.taskService.changeColumn(taskId, 1, columnId, event.currentIndex).subscribe(() => {
      })
    }
  }

  openAddTaskEditor() {
    this.taskEditorService.setShowEditor(true);
  }

  openEditTaskEditor(task: Task) {
    this.taskEditorService.setTaskDataToEdit(task);
    this.taskEditorService.setShowEditor(true);
  }

  public createAndShowNewTask(task: Task) {
    task.positionInColumn = this.board.columns[0].tasks.length + 1;
    this.taskService.create(task, 1, this.board.columns[0].id).subscribe((task) => {
      let updatedTask = new Task().deserialize(task);
      this.board.columns[0].tasks.push(updatedTask)
    })
  }

  public updateExistingTask(updatedTask: Task) {
    console.log(updatedTask)
    this.board.columns[0].tasks.map((task, i) => {
      if (task.id == updatedTask.id) {
        this.board.columns[0].tasks[i] = updatedTask;
      }
    });
  }

  addColumn() {
    if (this.board.columns.length <= 12) {
      let defaultNewColumnName = "New section";
      this.boardColumnService.createBoardColumn(1, this.board.id, defaultNewColumnName)
        .subscribe((columnId) => {
          this.board.columns.push(new Column(columnId, defaultNewColumnName, []))
        })
    } else {
      this.notifierService.showErrorNotification('You can\'t create more than 12 sections per board!', 5000);
      this.isAddNewSectionHidden = true;
    }
  }

  makeColumnTitleEditable(id: number) {
    this.isColumnTitleEditableMap.set(id, true);
  }

  makeColumnTitleNotEditable(id: number) {
    setTimeout(() => {
      this.isColumnTitleEditableMap.set(id, false);
    }, 300)
  }

  saveColumnName(id, value: string) {
    let thisColumn = this.board.columns[id - 1];
    thisColumn.name = value;

    this.boardColumnService.updateColumnName(1, thisColumn.id, value)
      .subscribe(() => {
        setTimeout(() => {
          this.isColumnTitleEditableMap.set(id, false);
        }, 100)
      })
  }

  deleteTask(taskId: number, taskIndex: number, columnId: number) {
    console.log(taskIndex)
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '400px',
      data: "Are you sure you want to delete this task?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.delete(taskId, columnId)
          .subscribe((response) => {
            this.board.columns.forEach((column) => {
              if (column.id == columnId) {
                column.tasks.splice(taskIndex, 1)
              }
            });
            this.notifierService.showSuccessNotification(response.message, 2000);
          })
      }
    });
  }

  deleteColumn(columnId: number, columnIndex, boardId: number) {
    if (this.board.columns[columnIndex].tasks.length > 0) {
      this.notifierService.showSuccessNotification("You can't delete this section while it has at least 1 task", 5000);
    } else {
      const dialogRef = this.dialog.open(ConfirmComponent, {
        width: '400px',
        data: 'Are you sure you want to delete this section?'
      });
      dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.boardColumnService.delete(columnId, boardId)
              .subscribe((response) => {
                this.board.columns.splice(columnIndex, 1);
                this.notifierService.showSuccessNotification(response.message, 2000);
              })
          }
        }
      )
    }
  }

}
