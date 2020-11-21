import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authApi = 'http://localhost:5000/api/auth/';
  userToken: any;
  public redirectUrl: string;
  jwtHelper: JwtHelperService = new JwtHelperService();
  decodedToken: any;


  constructor(private http: HttpClient) { }

  options = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' }),
    observe: 'response' as 'body',
    responseType: 'json' as 'json'
  };

  login(model: any) {

    return this.http.post(`${this.authApi}login`, model, this.options)
      .pipe(
        map((res: HttpResponse<any>) => {
          const r = res.body;

          if (r) {
            localStorage.setItem('token', r.tokenString);
            // localStorage.setItem('token', r.tokenString);
            this.decodedToken = this.jwtHelper.decodeToken(r.tokenString);
            console.log(this.decodedToken);
            this.userToken = r.tokenString;

          }

        }),
        catchError(this.handleError)
      );
  }

  register(model: any) {

    return this.http.post(`${this.authApi}register`, model, this.options)
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
