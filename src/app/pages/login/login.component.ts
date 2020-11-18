import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  model: any = {};

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.isLoggedIn();
  }

  ngOnDestroy() {
  }

  login() {
    this.authService.login(this.model)
      .subscribe(
        data => this.router.navigateByUrl('/dashboard'),
        error => console.log(error));
  }

  isLoggedIn() {

    const token = localStorage.getItem('token');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (token != null || isLoggedIn != null) {
      this.router.navigate(['/dashboard']);
    }
  }


}
