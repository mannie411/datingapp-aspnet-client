import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SnotifyService } from 'ng-snotify';
import { AuthService } from 'src/app/core/services/auth.service';
import {
  NgbDateStruct,
  NgbDatepicker,
  NgbInputDatepickerConfig,
} from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/core/models/User';
import { Router } from '@angular/router';
import { values } from 'underscore';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user: User;
  // @ViewChild('NgbdDatepicker') d: NgbDateStruct;
  // @ViewChild('d', { read: NgbDatepicker }) d: NgbDatepicker;
  date: NgbDatepicker;
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private snotitfyService: SnotifyService,
    private fb: FormBuilder,
    private config: NgbInputDatepickerConfig,
    private router: Router
  ) {
    config.minDate = { year: 1900, month: 1, day: 1 };
    config.maxDate = { year: 2099, month: 12, day: 31 };
  }

  ngOnInit() {
    this.createRegisterForm();
  }

  validateConfirmPass(passwd: FormGroup) {
    return passwd.get('password').value === passwd.get('confirmPass').value
      ? null
      : { mismatch: true };
  }

  createRegisterForm() {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(4)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPass: ['', Validators.required],
        dob: [null, Validators.required],
        gender: ['Male', Validators.required],
        knownAs: ['', Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
      },
      { validators: this.validateConfirmPass }
    );
  }

  register() {
    if (this.registerForm.valid) {
      const age = this.registerForm.get('dob').value;
      const format = `${age.year}/${age.month}/${age.day}`;
      this.registerForm.patchValue({ dob: format });
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(
        () => {
          this.registerForm.reset({});
          this.snotitfyService.success('Registration Successful');
        },
        (error) => this.snotitfyService.error(error),
        () => {
          this.authService
            .login(this.user)
            .subscribe(() => this.router.navigate(['/user/dashboard']));
        }
      );
    }
  }

  cancelled() {
    console.log('Cancelled');
  }
}
