import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, CanActivate } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { User } from 'src/app/core/models/User';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService, private snotifyService: SnotifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.getUsers();
    this.route.data.subscribe(data => {
      this.users = data.users;
    });

  }

  // getUsers() {
  //   this.userService.getUsers().subscribe(
  //     (users: User[]) => {
  //       this.users = users;
  //     },
  //     error => this.snotifyService.error(error)
  //   );
  // }

}
