import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment as env } from 'src/environments/environment';
import { DecodedToken } from '../models/DecodedToken';
import { User } from '../models/User';
import { SnotifyService } from 'ng-snotify';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = env.apiUrl;
  userToken: any;
  public redirectUrl: string;
  jwtHelper: JwtHelperService = new JwtHelperService();
  decodedToken: DecodedToken;
  currUser: User;
  photoUrl = new BehaviorSubject<string>('../../../assets/img/theme/user.png');
  currPhoto = this.photoUrl.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private snotifyService: SnotifyService
  ) {}

  options = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' }),
    observe: 'response' as 'body',
    responseType: 'json' as 'json',
  };

  logout() {
    this.userToken = null;
    this.currUser = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.snotifyService.simple('Logged out');
    this.router.navigate(['/login']);
  }

  login(model: any) {
    return this.http.post(`${this.apiUrl}auth/login`, model, this.options).pipe(
      map((r: HttpResponse<any>) => {
        if (r) {
          const { token, user } = r.body;
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          this.currUser = user;
          this.userToken = token;
          this.decodedToken = this.jwtHelper.decodeToken(token);
          this.currUser.photoUrl != null
            ? this.changePhoto(this.currUser.photoUrl)
            : this.changePhoto('../../../assets/img/theme/user.png');
        }
      }),
      catchError(this.handleError)
    );
  }

  register(user: User) {
    return this.http
      .post(`${this.apiUrl}auth/register`, user)
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    const appErr = err.headers.get('Application-Error');

    if (appErr) {
      return throwError(appErr);
    }

    let modelStateErr = '';
    if (err) {
      for (const key in err.error) {
        if (err.error[key]) {
          modelStateErr += err.error[key] + '\n';
        }
      }
    }

    return throwError(modelStateErr || 'Internal Server Error');
  }

  changePhoto(photo: string) {
    this.photoUrl.next(photo);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (token != null) {
      return this.jwtHelper.isTokenExpired(token);
    }
    return true;
  }

  decodeToken() {
    const token = localStorage.getItem('token');
    if (token != null) {
      this.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }
}
