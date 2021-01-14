import {EventEmitter, Injectable, Output} from '@angular/core';
import {RegisterRequestPayload} from '../dto/register-request.payload';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {LoginRequestPayload} from '../dto/login-request.payload';
import {LoginResponse} from '../dto/login-response.payload';
import {map, tap} from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {


  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  private refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUsername()
  };

  constructor(private httpClient: HttpClient) {

  }


  signup(signupRequestPayload: RegisterRequestPayload): Observable<any> {
    return this.httpClient.post('http://localhost:8082/api/auth/signup', signupRequestPayload, {responseType: 'text'});
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient.post<LoginResponse>('http://localhost:8082/api/auth/login', loginRequestPayload)
      .pipe(map(({authenticationToken, expiresAt, refreshToken, username}) => {

      localStorage.setItem('authenticationToken', authenticationToken);
      localStorage.setItem('username', username);
      localStorage.setItem('refreshToken', refreshToken);
      // @ts-ignore
      localStorage.setItem('expiresAt', expiresAt);

      return true;
    }));
  }

  logout() {
   this.refreshTokenPayload.username = this.getUsername();
   this.refreshTokenPayload.refreshToken = this.getRefreshToken();
    // console.log(this.refreshTokenPayload);
    this.httpClient.post('http://localhost:8082/api/auth/logout', this.refreshTokenPayload, {responseType: 'text'})
      .subscribe(data => {}, error => {throwError(error);});

    localStorage.removeItem('authenticationToken');
    localStorage.removeItem('username');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expiresAt');

  }

  getUsername(): string {
    return localStorage.getItem('username') as string;
  }

  getRefreshToken(): string {
    return localStorage.getItem('refreshToken') as string;
  }

  // tslint:disable-next-line:typedef
  getJwtToken(): string {
    return localStorage.getItem('authenticationToken') as string;
  }

  refreshToken() {
    return this.httpClient.post<LoginResponse>('http://localhost:8082/api/auth/refresh/token', this.refreshTokenPayload)
      .pipe(tap(response => {
        localStorage.removeItem('authenticationToken');
        localStorage.removeItem('expiresAt');
        localStorage.setItem('authenticationToken', response.authenticationToken);
        // @ts-ignore
        localStorage.setItem('expiresAt', response.expiresAt);
      }));
  }

  checkLogin(): boolean {
    if (this.getJwtToken() != null) {
      return true;
    } else {
      return false;
    }
  }
}
