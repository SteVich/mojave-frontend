import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from "./auth/auth.component";
import {MainComponent} from "./main/main.component";
import {AuthGuard} from "./auth/auth.guard";
import {TeamComponent} from "./team/team.component";
import {HomeComponent} from "./home/home.component";
import {ProjectComponent} from "./project/project.component";

const routes: Routes = [
  {path: 'auth', component: AuthComponent},
  {path: '', component: MainComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'project', component: ProjectComponent, canActivate: [AuthGuard]},
  {path: 'team', component: TeamComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
