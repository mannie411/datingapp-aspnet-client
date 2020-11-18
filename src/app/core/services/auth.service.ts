import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authApi = 'http://localhost:5000/api/auth/';
  userToken: any;
  public redirectUrl: string;

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
            localStorage.setItem('isLoggedIn', 'true');
            this.userToken = r.tokenString;

          }

        }));
  }

  register(model: any) {

    return this.http.post(`${this.authApi}register`, model, this.options);
  }



}
