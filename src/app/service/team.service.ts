import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {User} from "../common/models/user.model";
import {Observable, of} from "rxjs";
import {ApiResponse} from "../common/models/apiResponse.model";

@Injectable({providedIn: 'root'})
export class TeamService {

  constructor(private router: Router, private http: HttpClient) {
  }

  getTeamMembers(): Observable<User[]> {
    return of([
      new User(1, "Vitaliy Stefanchak", "SteVi", "trozzato@gmail.com", "", "Project Owner"),
      new User(2, "Ilon Mask", "Ilon", "ilon@gmail.com", "", "PM"),
      new User(3, "Jeff Bezos", "Jeff", "ammazon@gmail.com", "", "QA")
    ]);
  }

  removeMember(memberId: number, projectId: number): Observable<ApiResponse> {
    return of(new ApiResponse());
  }

  saveRole(memberId: number, role: string): Observable<ApiResponse> {
    return of(new ApiResponse());
  }
}
