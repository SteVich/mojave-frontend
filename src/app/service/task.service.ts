import {Injectable, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {Assignee} from "../main/models/assignee.model";
import {Milestone} from "../main/models/milestone.model";
import {Tag} from "../main/models/tag.model";
import {ApiResponse} from "../common/models/apiResponse.model";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Task} from "../main/models/task.model";

@Injectable({
  providedIn: 'root'
})
export class TaskService implements OnInit {

  private options = {headers: {'Content-Type': 'application/json'}};

  constructor(private router: Router, private http: HttpClient) {
  }

  ngOnInit() {
  }

  getAssignees(): Observable<Assignee[]> {
    return this.http.get<Assignee[]>(environment.API_URL + '/user'); // todo: rewrite it later on team members
  }

  getMilestones(projectId: number): Observable<Milestone[]> {
    return this.http.get<Milestone[]>(environment.API_URL + '/project/' + projectId + '/milestone');
  }

  getTags(projectId: number): Observable<Tag[]> {
    return this.http.get<Tag[]>(environment.API_URL + '/project/' + projectId + '/tag');
  }

  create(task: Task, projectId: number, columnId: number): Observable<Task> {
    return this.http.post<Task>(environment.API_URL + '/project/' + projectId + '/board/column/' + columnId + '/task', task, this.options);
  }

  edit(task: Task, taskId: number, projectId: number, columnId: number): Observable<Task> {
    return this.http.put<Task>(environment.API_URL + '/project/' + projectId + '/board/column/' + columnId + '/task/' + taskId, task, this.options);
  }

  changeColumn(taskId: number, projectId: number, newColumnId: number, newTaskPosition: any): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(environment.API_URL + '/project/' + projectId + '/board/column/' + newColumnId + '/task/' + taskId + '/change-column',
      {}, {params: {'taskPosition': newTaskPosition}});
  }

  changeTasksPositionsInColumn(taskIds: number[], projectId: number, newColumnId: number): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(environment.API_URL + '/project/' + projectId + '/board/column/' + newColumnId + '/task/change-tasks-positions', taskIds, this.options);
  }

  delete(taskId: number, columnId: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(environment.API_URL + '/project/board/column/' + columnId + '/task/' + taskId, this.options);
  }

  duplicate(taskId: number, columnId: number, projectId: number): Observable<Task> {
    return this.http.post<Task>(environment.API_URL + '/project/' + projectId + '/board/column/' + columnId + '/task/' + taskId + '/duplicate', this.options);
  }
}
