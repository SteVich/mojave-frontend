import {Injectable, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {Board} from "../main/models/board.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BoardService implements OnInit {

  constructor(private router: Router, private http: HttpClient) {
  }

  ngOnInit() {
  }

  getDefaultForProject(projectId: number): Observable<Board> {
    return this.http.get<Board>(environment.API_URL + '/project/' + projectId + '/board');
  }
}

