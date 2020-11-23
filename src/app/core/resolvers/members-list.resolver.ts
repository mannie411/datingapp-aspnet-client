import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { empty } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/User';
import { UserService } from '../services/user.service';

@Injectable()

export class MemberListResolver implements Resolve<User[]>{
    constructor(private userService: UserService,
        private router: Router,
        private snotifyService: SnotifyService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.userService.getUsers().pipe(catchError(error => {
            this.snotifyService.error('Unable to fetch data');
            this.router.navigate(['dashboard']);
            return empty();
        }));
    }

}