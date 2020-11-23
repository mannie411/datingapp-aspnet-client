import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { error } from 'protractor';
import { User } from 'src/app/core/models/User';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;
  active = 1;

  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private snotifyService: SnotifyService) { }

  ngOnInit() {
    // this.getUser();
    this.route.data.subscribe(data => {
      this.user = data.user;
    });
  }

  // getUser() {
  //   this.userService.getUser(+this.route.snapshot.params.id).subscribe(
  //     (user) => {
  //       this.user = user;
  //     },
  //     error => this.snotifyService.error(error)
  //   );
  // }

}
