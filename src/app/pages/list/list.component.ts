import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { Pagination } from 'src/app/core/models/Pagination';
import { User } from 'src/app/core/models/User';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  users: User[];
  pagination: Pagination;
  likesParams: string;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private snotifyService: SnotifyService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.users = data.user.body;
      this.pagination = JSON.parse(data.user.headers.headers.get('pagination'));
    });

    this.likesParams = 'Likers';
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
        null,
        this.likesParams
      )
      .subscribe((res) => {
        this.users = res.body as User[];
        this.pagination = JSON.parse(res.headers.get('pagination'));
      });
  }
}
