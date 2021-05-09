import {Component, OnInit} from '@angular/core';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {Router} from "@angular/router";
import {NavigationService} from "../../services/navigation.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuIcon = faBars
  selectedNavItem: number = 1

  constructor(private router: Router, private navService: NavigationService) {
  }

  ngOnInit(): void {
    if (this.router.url == '/') {
      this.selectedNavItem = 1;
    } else if (this.router.url == 'task') {
      this.selectedNavItem = 2;
    } else if (this.router.url == 'team') {
      this.selectedNavItem = 3;
    }
  }

  gotoBoard() {
    if (this.router.url !== '/') {
      this.router.navigate(['']);
    }
  }

  gotoTasks() {
    if (this.router.url !== 'task') {
      this.router.navigate(['task']);
    }
  }

  gotoTeam() {
    if (this.router.url !== 'team') {
      this.router.navigate(['team']);
    }
  }

  toggleSideNav() {
    this.navService.setShowNav(true);
  }
}
