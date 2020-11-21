import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  public user: any;

  constructor(location: Location, private element: ElementRef,
    private router: Router, private authService: AuthService,
    private snotitfyService: SnotifyService) {
    this.location = location;
    this.user = authService.decodedToken?.unique_name;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }

  getTitle() {
    let titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }


  logout() {
    this.authService.userToken = null;
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
