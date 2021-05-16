import {Injectable, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ApiResponse} from "../common/models/apiResponse.model";

@Injectable({
  providedIn: 'root'
})
export class BoardColumnService implements OnInit {

  constructor(private router: Router, private http: HttpClient) {
  }

  ngOnInit() {
  }

  createBoardColumn(projectId: number, boardId: number, columnName: string): Observable<number> {
    return this.http.post<number>(environment.API_URL + '/project/' + projectId + '/board/' + boardId + '/column',
      {}, {params: {'columnName': columnName}});
  }

  updateColumnName(projectId: number, columnId: number, newColumnName: string): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(environment.API_URL + '/project/' + projectId + '/board/column/' + columnId,
      {}, {params: {'newColumnName': newColumnName}});
  }

  changePositionsInBoard(ids: number[], boardId: number): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(environment.API_URL + '/project/board/' + boardId + '/column/update-positions', ids);
  }

  delete(columnId: number, boardId: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(environment.API_URL + '/project/board/' + boardId + '/column/' + columnId);
  }
}

