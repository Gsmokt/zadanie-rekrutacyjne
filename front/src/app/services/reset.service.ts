import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, tap } from 'rxjs';

interface User {
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class ResetService {
  constructor(private http: HttpClient) {}

  reset(body: User): Observable<User> {
    const headers = { 'Content-Type': 'application/json; charset=utf-8' };
    return this.http.post<User>(
      environment.baseUrl + 'users/resetPassword',
      body,
      {
        headers,
      }
    );
  }
}
