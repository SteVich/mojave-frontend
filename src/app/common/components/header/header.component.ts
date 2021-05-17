import {Component, Input, OnInit} from '@angular/core';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {Router} from "@angular/router";
import {NavigationService} from "../../services/navigation.service";
import {UserService} from "../../../service/user.service";
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: ' app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuIcon = faBars
  selectedNavItem: number = 1
  username: string

  @Input("hideNavItems")
  hideNavItems: boolean = false;

  constructor(private router: Router,
              private navService: NavigationService,
              private userService: UserService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    if (this.router.url == '/') {
      this.selectedNavItem = 1;
    } else if (this.router.url == 'task') {
      this.selectedNavItem = 2;
    } else if (this.router.url == 'team') {
      this.selectedNavItem = 3;
    }

    this.userService.getCurrentUser().subscribe(user => {
      this.username = user.username;
    })
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
    if (this.navService.isNavOpen()) {
      this.navService.setShowNav(false);
    } else {
      this.navService.setShowNav(true);
    }
  }

  logout() {
    this.authService.logout();
  }
}
