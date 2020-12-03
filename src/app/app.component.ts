import { Component, OnInit } from '@angular/core';
import { User } from './core/models/User';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Dating App';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.authService.decodeToken();
    if (user) {
      this.authService.currUser = user;
      user.photoUrl != null
        ? this.authService.changePhoto(user.photoUrl)
        : this.authService.changePhoto('../assets/img/theme/user.png');
    }
  }
}
