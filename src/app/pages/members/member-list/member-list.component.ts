import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, CanActivate } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { Pagination } from 'src/app/core/models/Pagination';
import { User } from 'src/app/core/models/User';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  users: User[];
  user: User = JSON.parse(localStorage.getItem('user'));
  genders = [
    { value: 'Male', display: 'Males' },
    { value: 'Female', display: 'Females' },
    { value: 'Others', display: 'Others' },
  ];
  userParams: any = {};
  pagination: Pagination;

  constructor(
    private userService: UserService,
    private snotifyService: SnotifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.getUsers();
    this.route.data.subscribe((data) => {
      this.users = data.users.body;
      this.pagination = JSON.parse(
        data.users.headers.headers.get('pagination')
      );
    });

    this.userParams.gender =
      this.userParams.gender === 'Female' ? 'Male' : 'Female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
  }

  changePage(event: any): void {
    this.pagination.currentPage = event;
    this.loadUser();
  }

  loadUser() {
    return this.userService
      .getUsers(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.userParams
      )
      .subscribe((res) => {
        this.users = res.body as User[];
        // console.log(res.headers);
      });
  }

  resetFilter() {
    this.userParams.gender =
      this.userParams.gender === 'Male' ? 'Female' : 'Male';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.loadUser();
  }

  // getUsers() {
  //   this.userService.getUsers().subscribe(
  //     (res) => {
  //       console.log(res);
  //       // this.users = users;
  //     },
  //     (error) => this.snotifyService.error(error)
  //   );
  // }
}
