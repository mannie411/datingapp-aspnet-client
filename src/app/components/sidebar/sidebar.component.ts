import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { AuthService } from 'src/app/core/services/auth.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: 'dashboard',
    title: 'Dashboard',
    icon: 'ni ni-tv-2 text-primary',
    class: '',
  },
  { path: 'icons', title: 'Icons', icon: 'ni ni-planet text-blue', class: '' },
  { path: 'maps', title: 'Maps', icon: 'ni ni-pin-3 text-orange', class: '' },
  {
    path: 'profile',
    title: 'Profile',
    icon: ' ni ni-single-02 text-yellow',
    class: '',
  },
  {
    path: 'list',
    title: 'List',
    icon: 'ni ni-bullet-list-67 text-red',
    class: '',
  },
  {
    path: 'members',
    title: 'Members',
    icon: 'fa fa-users text-orange',
    class: '',
  },
  {
    path: 'messages',
    title: 'Messages',
    icon: 'ni ni-chat-round text-blue',
    class: '',
  },
  // { path: '/login', title: 'Login', icon: 'ni-key-25 text-info', class: '' },
  // { path: '/register', title: 'Register', icon: 'ni-circle-08 text-pink', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;
  public user: any;
  public img: string;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
    this.user = this.authService.decodedToken?.unique_name;
    this.authService.photoUrl.subscribe((p) => (this.img = p));
  }

  logout() {
    this.authService.logout();
  }
}
