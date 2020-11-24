import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Injectable()

export class MemberEditResolver implements Resolve<User>{

    constructor(private userService: UserService,
        private authService: AuthService,
        private router: Router,
        private snotifyService: SnotifyService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.userService.getUser(this.authService.decodedToken.nameid).pipe(catchError(error => {
            this.snotifyService.error('Unable to fetch data');
            this.router.navigate(['members']);
            return of(null);
        }));
    }

}