import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { User } from 'src/app/core/models/User';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  active = 1;
  user: User;
  img: string;
  @ViewChild('editForm') editForm: NgForm;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private snotifyService: SnotifyService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.user = data.user;
    });
    this.authService.currPhoto.subscribe((p) => (this.img = p));
  }

  onEdit() {
    this.router.navigate(['user/profile/edit']);
  }

  onSubmit() {
    this.userService
      .updateUser(+this.authService.decodedToken.nameid, this.user)
      .subscribe(
        (next) => {
          this.snotifyService.success('Update Successfull');
          this.router.navigate(['user/profile']);
          this.editForm.reset(this.user);
        },
        (error) => this.snotifyService.error(error)
      );
  }

  photoChange(event) {
    this.user.photoUrl = event;
  }
}
