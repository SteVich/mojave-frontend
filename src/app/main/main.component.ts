import {Component, OnInit, ViewEncapsulation} from '@angular/core';
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
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";


@Component({
  selector: 'app-main-view',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit {

  board: Board = new Board();
  isColumnTitleEditableMap: Map<number, boolean> = new Map();
  isAddNewSectionHidden: boolean = false;

  projectId: number;
  role: string = 'ROLE_DEVELOPER';

  showSpinner = true;

  constructor(private taskEditorService: TaskEditorService,
              private boardService: BoardService,
              private taskService: TaskService,
              private boardColumnService: BoardColumnService,
              private notifierService: NotifierService,
              private dialog: MatDialog,
              private router: Router,
              private jwtHelper: JwtHelperService) {
  }

  ngOnInit() {
    this.projectId = Number(localStorage.getItem('projectId'));

    if (!this.projectId) {
      this.router.navigate(['home'])
    }

    const token = localStorage.getItem('accessToken');
    this.jwtHelper.decodeToken(token).roles
      .filter(roleObject => roleObject.projectId == this.projectId)
      .forEach(roleObject => this.role = roleObject.role);

    this.boardService.getDefaultForProject(this.projectId).subscribe((board) => {
      setTimeout(() => {
        this.board = board;
        this.showSpinner = false;
      }, 200)
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

      this.taskService.changeTasksPositionsInColumn(taskIds, this.projectId, columnId).subscribe(() => {
      })
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      let taskId = event.container.data[event.currentIndex].id
      this.taskService.changeColumn(taskId, this.projectId, columnId, event.currentIndex).subscribe(() => {
      })
    }
  }

  openAddTaskEditor() {
    this.taskEditorService.setShowEditor(true);
  }

  private editColumnIndex: number;

  openEditTaskEditor(task: Task, columnIndex: number) {
    this.taskEditorService.setTaskDataToEdit(task);
    this.taskEditorService.setShowEditor(true);
    this.editColumnIndex = columnIndex;
  }

  public createAndShowNewTask(task: Task) {
    task.positionInColumn = this.board.columns[0].tasks.length + 1;
    this.taskService.create(task, this.projectId, this.board.columns[0].id).subscribe((task) => {
      let updatedTask = new Task().deserialize(task);
      this.board.columns[0].tasks.push(updatedTask)
    })
  }

  public updateExistingTask(updatedTask: Task) {
    this.board.columns[this.editColumnIndex].tasks.map((task, i) => {
      if (task.id == updatedTask.id) {
        this.board.columns[this.editColumnIndex].tasks[i] = updatedTask;
      }
    });
  }

  addColumn() {
    if (this.board.columns.length <= 12) {
      let defaultNewColumnName = "New section";
      this.boardColumnService.createBoardColumn(this.projectId, this.board.id, defaultNewColumnName)
        .subscribe((columnId) => {
          this.board.columns.push(new Column(columnId, defaultNewColumnName, []))
        })
    } else {
      this.notifierService.showErrorNotification("You can't create more than 12 sections per board!", 5000);
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

  saveColumnName(id, columnIndex: number, value: string) {
    let thisColumn = this.board.columns[columnIndex];
    thisColumn.name = value;

    this.boardColumnService.updateColumnName(this.projectId, thisColumn.id, value)
      .subscribe(() => {
        setTimeout(() => {
          this.isColumnTitleEditableMap.set(id, false);
        }, 100)
      })
  }

  deleteTask(taskId: number, taskIndex: number, columnId: number) {
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

  duplicateTask(taskId: number, taskIndex: number, columnId: number) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '400px',
      data: "Are you sure you want to duplicate this task?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.duplicate(taskId, columnId, 1)
          .subscribe((duplicatedTask) => {
            this.board.columns.forEach((column) => {
              if (column.id == columnId) {
                column.tasks.push(duplicatedTask)
              }
            });
            this.notifierService.showSuccessNotification("Tas was successfully duplicated", 2000);
          })
      }
    });
  }

  deleteColumn(columnId: number, columnIndex, boardId: number) {
    if (this.board.columns[columnIndex].tasks.length > 0) {
      this.notifierService.showSuccessNotification("You can't delete this section while it has at least 1 task", 7000);
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

  moveColumnRight(columnIndex: number) {
    let cutOut = this.board.columns.splice(columnIndex, 1)[0];
    this.board.columns.splice(columnIndex + 1, 0, cutOut);

    this.updateColumnPositions();
  }

  moveColumnLeft(columnIndex: number) {
    let cutOut = this.board.columns.splice(columnIndex, 1)[0];
    this.board.columns.splice(columnIndex - 1, 0, cutOut);

    this.updateColumnPositions();
  }

  private updateColumnPositions() {
    let ids = [];
    this.board.columns.forEach(column => {
      ids.push(column.id)
    })

    this.boardColumnService.changePositionsInBoard(ids, this.board.id).subscribe(() => {
    })
  }
}
