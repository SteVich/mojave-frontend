import {Injectable, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {Project} from "../common/models/project.model";
import {ApiResponse} from "../common/models/apiResponse.model";
import {Tag} from "../main/models/tag.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProjectService implements OnInit {

  constructor(private router: Router, private http: HttpClient) {
  }

  ngOnInit() {
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(environment.API_URL + '/project/' + id);
  }

  saveProjectName(id: number, name: string): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(environment.API_URL + '/project/' + id + '/name', {},
      {params: {'name': name}});
  }

  saveProjectDescription(id: number, description: string): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(environment.API_URL + '/project/' + id + '/description', {},
      {params: {'description': description}});
  }

  saveProjectImageUrl(id: number, imageUrl: string): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(environment.API_URL + '/project/' + id + '/imageUrl', {},
      {params: {'imageUrl': imageUrl}});
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
}

