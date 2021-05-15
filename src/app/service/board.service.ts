import {Injectable, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {Task} from "../main/models/task.model";
import {Board} from "../main/models/board.model";
import {Column} from "../main/models/column.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BoardService implements OnInit {

  private options = {headers: {'Content-Type': 'application/json'}};

  constructor(private router: Router, private http: HttpClient) {
  }

  ngOnInit() {
  }

  getDefaultBoard(): Observable<Board> {
    let task1 = new Task();
    task1.title = "Create data base table"
    let task2 = new Task();
    task2.title = "Create CRUD"

    return of(new Board(1, 'Board', [
      new Column(1, "Backlog", [task1, task2]),
      new Column(2, "In progress", [task1, task2]),
      new Column(3, "Done", [task1, task2])
    ]))
  }

  getDefaultForProject(projectId: number): Observable<Board> {
    return this.http.get<Board>(environment.API_URL + '/project/' + projectId + '/board');
  }
}

