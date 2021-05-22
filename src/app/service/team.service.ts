import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {User} from "../common/models/user.model";
import {Observable} from "rxjs";
import {ApiResponse} from "../common/models/apiResponse.model";
import {environment} from "../../environments/environment";
import {Invite} from "../team/invite-member/model/invite.model";

@Injectable({providedIn: 'root'})
export class TeamService {

  constructor(private router: Router, private http: HttpClient) {
  }

  getTeamMembers(projectId: number): Observable<User[]> {
    return this.http.get<User[]>(environment.API_URL + '/project/' + projectId + '/team');
  }

  removeMember(memberId: number, projectId: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(environment.API_URL + '/project/' + projectId + '/team/' + memberId);
  }

  saveRole(projectId: number, memberId: number, role: string): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(environment.API_URL + '/project/' + projectId + '/team/' + memberId, {},
      {params: {'role': role}});
  }

  inviteMembers(projectId: number, request: Invite): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(environment.API_URL + '/project/' + projectId + '/team', request);
  }

  doesEmailExists(projectId: number, email: string): Observable<boolean> {
    return this.http.get<boolean>(environment.API_URL + '/project/' + projectId + '/team/verify-email-presents', {params: {'email': email}});
  }
}
