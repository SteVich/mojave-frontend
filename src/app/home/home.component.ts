import {Component, OnInit} from '@angular/core';
import {Project} from "../common/models/project.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) {
  }

  projects: Project[] = [
    new Project(1, 'Mojave', 'https://i.redd.it/b3esnz5ra34y.jpg', '', [], []),
    new Project(1, 'Apple', 'https://i.redd.it/b3esnz5ra34y.jpg', '', [], []),
    new Project(1, 'Ferrari', 'https://i.redd.it/b3esnz5ra34y.jpg', '', [], []),
  ];

  ngOnInit(): void {
  }

  routeToProject(project: Project) {
    this.router.navigate(['project'])
  }
}
