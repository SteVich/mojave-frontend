import {Injectable, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
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
    return of([new Assignee(1, "Ste Vi"), new Assignee(2, "Ilon")]);
  }

  getMilestones(): Observable<Milestone[]> {
    return of([new Milestone(1, "April"), new Milestone(2, "May")]);
  }

  getTags(): Observable<Tag[]> {
    return of([new Tag(1, "Story"), new Tag(2, "Bug")]);
  }

  create(task: Task): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(environment.API_URL + '/task', task, this.options);
  }

}
