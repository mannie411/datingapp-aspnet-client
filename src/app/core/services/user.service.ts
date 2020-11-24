import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = env.apiUrl;

  constructor(private http: HttpClient) { }

  // options = {
  //   headers: new HttpHeaders({
  //     'Content-type': 'application/json',
  //     'Authorization': 'Bearer token'
  //   }),
  //   observe: 'response' as 'body',
  //   responseType: 'json' as 'json'
  // };

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}users`).pipe(
      // map(res => res),
      catchError(this.handleError)
    );
  }

  getUser(id): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}users/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(id: number, user: User) {
    return this.http.put(`${this.apiUrl}users/${id}`, user).pipe(catchError(this.handleError));
  }

  // private jwt() {
  //   const token = localStorage.getItem('token');

  //   if (token) {
  //     this.options.headers = this.options.headers.set('Authorization', `Bearer ${token}`);
  //     return this.options;
  //   }
  // }

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

}
