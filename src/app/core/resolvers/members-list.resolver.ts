import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/User';
import { UserService } from '../services/user.service';

@Injectable()
export class MemberListResolver implements Resolve<User[]> {
  pageNm = 1;
  pageSz = 5;
  constructor(
    private userService: UserService,
    private router: Router,
    private snotifyService: SnotifyService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User[]> {
    return this.userService.getUsers(this.pageNm, this.pageSz).pipe(
      catchError((error) => {
        this.snotifyService.error('Unable to fetch data');
        this.router.navigate(['user/dashboard']);
        return of(null);
      })
    );
  }
}
