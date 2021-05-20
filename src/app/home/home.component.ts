import {Component, OnInit} from '@angular/core';
import {Project} from "../common/models/project.model";
import {Router} from "@angular/router";
import {ProjectService} from "../service/project.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
              private http: HttpClient,
              private projectService: ProjectService) {
  }

  defaultImageUrl: string = 'https://i.redd.it/b3esnz5ra34y.jpg' //todo: it does not work
  projects: Project[] = [];

  ngOnInit(): void {
    this.projectService.geAllProjectsForUser().subscribe(projects => {
      console.log()
      this.projects = projects;
      this.projects.forEach(project => {

        if (project.imageUrl == undefined || project.imageUrl == '') {
          project.imageUrl = this.defaultImageUrl;
        }
      })
    })
  }

  routeToProject(project: Project) {
    localStorage.setItem('projectId', String(project.id));
    this.router.navigate(['project'])
  }

  createNewProject() {
    localStorage.removeItem('projectId');
    this.router.navigate(['project'])
  }

  setDefaultImageUrl(index: number) {
    console.log("asdad")
    this.projects[index].imageUrl = this.defaultImageUrl;
  }
}
