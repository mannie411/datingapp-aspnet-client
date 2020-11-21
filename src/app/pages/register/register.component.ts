import { Component, OnInit } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};

  constructor(private authService: AuthService, private snotitfyService: SnotifyService) { }

  ngOnInit() {

  }

  register() {
    this.authService.register(this.model).subscribe(
      () => this.snotitfyService.success('Registration Successful'),
      error => this.snotitfyService.error(error));
  }

  cancelled() {
    console.log('Cancelled');
  }

}
