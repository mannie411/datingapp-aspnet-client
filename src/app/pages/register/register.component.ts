import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {

  }

  register() {
    this.authService.register(this.model).subscribe(
      () => console.log('Registration Successful'),
      error => console.log(error));
  }

  cancelled() {
    console.log('Cancelled');
  }

}
