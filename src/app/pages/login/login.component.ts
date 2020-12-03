import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  model: any = {};

  constructor(
    private authService: AuthService,
    private router: Router,
    private snotitfyService: SnotifyService
  ) {}

  ngOnInit() {
    this.isLoggedIn();
  }

  ngOnDestroy() {}

  login() {
    this.authService.login(this.model).subscribe(
      () => this.router.navigateByUrl('user/dashboard'),
      (error) => {
        //  this.snotitfyService.error(error)
        console.log(error);
      }
    );
  }

  isLoggedIn() {
    const valid = this.authService.isLoggedIn();

    if (valid === false) {
      this.router.navigate(['user/dashboard']);
    }
  }
}
