import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from "./auth/auth.component";
import {MainComponent} from "./main/main.component";
import {AuthGuard} from "./auth/auth.guard";

const routes: Routes = [
  {path: 'auth', component: AuthComponent},
  {path: '', component: MainComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
