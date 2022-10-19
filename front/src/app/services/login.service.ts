import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(body: User) {
    const headers = { 'Content-Type': 'application/json; charset=utf-8' };
    return this.http.post<User>(environment.baseUrl + 'auth/login', body, {
      headers,
    });
  }
}
