import {Injectable, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {Project} from "../common/models/project.model";
import {Milestone} from "../main/models/milestone.model";
import {ApiResponse} from "../common/models/apiResponse.model";
import {Tag} from "../main/models/tag.model";

@Injectable({
  providedIn: 'root'
})
export class ProjectService implements OnInit {

  constructor(private router: Router, private http: HttpClient) {
  }

  ngOnInit() {
  }

  getProject(): Observable<Project> {
    let milestone = new Milestone();
    milestone.id = 1;
    milestone.name = "June"

    let tag = new Tag();
    tag.id = 1;
    tag.name = "Bug";
    tag.color = 'gray';

    return of(new Project(1, 'Mojave', '', "Descriptions", [milestone], [tag]));
  }

  saveProjectName(id: number, name: string): Observable<ApiResponse> {
    console.log(name)
    return of();
  }

  saveProjectDescription(id: number, description: string): Observable<ApiResponse> {
    console.log(description)
    return of();
  }

  saveProjectMilestone(id: number, milestone: string): Observable<ApiResponse> {
    console.log(milestone)
    return of();
  }

  saveProjectTag(id: number, tag: string): Observable<ApiResponse> {
    console.log(tag)
    return of();
  }

  updateProjectTag(tag: Tag): Observable<ApiResponse> {
    console.log(tag)
    return of();
  }

  saveProjectImageUrl(id: number, imagUrl: string): Observable<ApiResponse> {
    console.log(imagUrl)
    return of();
  }
}

