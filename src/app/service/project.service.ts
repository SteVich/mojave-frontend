import {Injectable, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {Project} from "../common/models/project.model";
import {ApiResponse} from "../common/models/apiResponse.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProjectService implements OnInit {

  constructor(private router: Router, private http: HttpClient) {
  }

  ngOnInit() {
  }

  geAllProjectsForUser(): Observable<Project[]> {
    return this.http.get<Project[]>(environment.API_URL + '/project');
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(environment.API_URL + '/project/' + id);
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(environment.API_URL + '/project', project);
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

  saveProjectMilestone(projectId: number, milestone: string): Observable<number> {
    return this.http.post<number>(environment.API_URL + '/project/' + projectId + '/milestone', {},
      {params: {'name': milestone}});
  }

  deleteProjectMilestone(projectId: number, milestoneId: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(environment.API_URL + '/project/' + projectId + '/milestone/' + milestoneId);
  }

  saveProjectTag(projectId: number, tag: string, color: string): Observable<number> {
    return this.http.post<number>(environment.API_URL + '/project/' + projectId + '/tag', {},
      {params: {'name': tag, 'color': color}});
  }

  deleteProjectTag(projectId: number, tagId: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(environment.API_URL + '/project/' + projectId + '/tag/' + tagId);
  }

  updateProjectColor(tagId: number, newColor: string): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(environment.API_URL + '/project/tag/' + tagId, {},
      {params: {'newColor': newColor}});
  }
}

