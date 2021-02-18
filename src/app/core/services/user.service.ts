import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';
import { PaginatedResult, Pagination } from '../models/Pagination';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = env.apiUrl;

  constructor(private http: HttpClient) {}

  // options = {
  //   headers: new HttpHeaders({
  //     'Content-type': 'application/json',
  //     'Authorization': 'Bearer token'
  //   }),
  //   observe: 'response' as 'body',
  //   responseType: 'json' as 'json'
  // };

  getUsers(
    page?: number,
    pageItem?: number,
    userParams?: any,
    likesParams?: any
  ) {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<
      User[]
    >();
    let query = '?';
    if (page != null && pageItem != null) {
      query += `pageNumber=${page}&pageSize=${pageItem}&`;
    }
    if (userParams != null) {
      query += `minAge=${userParams.minAge}&maxAge=${userParams.maxAge}&gender=${userParams.gender}`;
    }
    if (likesParams === 'Likers') {
      query += `Likers=true`;
    }
    if (likesParams === 'Likees') {
      query += `Likees=true`;
    }

    return this.http
      .get(`${this.apiUrl}users`, {
        observe: 'response' as 'body',
        params: { query },
      })
      .pipe(
        tap((res: HttpResponse<any>) => {
          paginatedResult.result = res.body as User[];

          if (res.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(
              res.headers.get('Pagination')
            );
          }
          return paginatedResult;
        }),
        catchError(this.handleError)
      );
  }

  getUser(id): Observable<User> {
    return this.http
      .get<User>(`${this.apiUrl}users/${id}`)
      .pipe(catchError(this.handleError));
  }

  updateUser(id: number, user: User) {
    return this.http
      .put(`${this.apiUrl}users/${id}`, user)
      .pipe(catchError(this.handleError));
  }

  deletePhoto(userId: number, photoId: number) {
    return this.http
      .delete(`${this.apiUrl}users/${userId}/photo/${photoId}`)
      .pipe(
        map((r: any) => r.message),
        catchError(this.handleError)
      );
  }

  setMainPhoto(userId: number, photoId: number) {
    return this.http
      .post(`${this.apiUrl}users/${userId}/photo/setmain/${photoId}`, {})
      .pipe(catchError(this.handleError));
  }

  likeUser(userId: number, recipientId: number) {
    return this.http
      .post(`${this.apiUrl}users/${userId}/like/${recipientId}`, {})
      .pipe(catchError(this.handleError));
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
