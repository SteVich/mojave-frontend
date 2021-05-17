import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav-content',
  templateUrl: './side-nav-content.component.html',
  styleUrls: ['./side-nav-content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SideNavContentComponent implements OnInit {

  navItems = [
    {label: 'Home', icon: "cottage", route: 'home'},
    {label: 'Project', icon: "content_paste", route: 'project'},
    {label: 'Profile', icon: "person_outline", route: '/'},
    {label: 'Help', icon: "help_outline", route: '/'}
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateHome() {
    this.router.navigate(['home']);
  }

  onNavigationSelection(navItem: any) {
    this.router.navigate([navItem.route]);
  }

}
