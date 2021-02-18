import { Component, Input, OnInit } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
import { User } from 'src/app/core/models/User';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
})
export class MemberCardComponent implements OnInit {
  @Input() user: User;
  defaultImg = '../../../../assets/img/theme/user.png';

  constructor(
    private authService: AuthService,
    private userSerive: UserService,
    private snotifyService: SnotifyService
  ) {}

  ngOnInit() {}

  likeUser(id: number) {
    return this.userSerive
      .likeUser(+this.authService.decodedToken.nameid, id)
      .subscribe(
        () => this.snotifyService.success(`You've liked ${this.user.knownAs}`),
        (error) => this.snotifyService.error(error)
      );
  }
}
