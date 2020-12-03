import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/User';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
})
export class MemberCardComponent implements OnInit {
  @Input() user: User;
  defaultImg = '../../../../assets/img/theme/user.png';

  constructor() {}

  ngOnInit() {}
}
