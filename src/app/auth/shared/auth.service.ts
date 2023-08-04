import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupRequestPayload } from '../signup/singup-request.payload';
import { Observable, throwError } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginRequestPayload } from '../login/login-request.payload';
import { LoginResponse } from '../login/login-response.payload';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() userName: EventEmitter<string> = new EventEmitter();

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) {}

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.httpClient.post(`${environment.API_BASE_URL}/auth/register`, signupRequestPayload, { responseType: 'text' });
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient.post<LoginResponse>(`${environment.API_BASE_URL}/auth/login`, loginRequestPayload)
      .pipe(
        tap(data => {
          this.storeAuthData(data);
        }),
        map(() => true),
        catchError((error) => {
          console.error('Error during login:', error);
          return throwError(error);
        })
      );
  }

  getJwtToken(): string | null {
    return this.localStorage.retrieve('authenticationToken');
  }

  refreshToken(): Observable<LoginResponse> {
    const refreshTokenPayload = {
      refreshToken: this.getRefreshToken(),
      username: this.getUserName()
    };
console.log(refreshTokenPayload)
    return this.httpClient.post<LoginResponse>(`${environment.API_BASE_URL}/auth/refresh/token`, refreshTokenPayload)
      .pipe(
        tap(response => {
          this.storeAuthData(response);
          console.log(`response: + ${response}`)
        }),
        catchError((error) => {
          console.error('Error during token refresh:', error);
          return throwError(error);
        })
      );
  }

  logout() {
    const refreshToken = this.getRefreshToken();
    const username = this.getUserName();

    if (refreshToken && username) {
      this.httpClient.post(`${environment.API_BASE_URL}/auth/logout`, { refreshToken, username }, { responseType: 'text' })
        .subscribe({
          next: data => {
            console.log(data);
          },
          error(err) {
            console.error('Error during logout:', err);
            throw err;
          },
        });
    }

    this.clearAuthData();
  }

  getUserName(): string | '' {
    return this.localStorage.retrieve('username');
  }

  getRefreshToken(): string | null {
    return this.localStorage.retrieve('refreshToken');
  }

  checkExpiry(): boolean {
    const expirationDate = this.localStorage.retrieve('expiresAt');
    if (!expirationDate) {
      // If there is no expiration date stored, consider the token as expired
      return true;
    }

    const now = new Date().getTime() / 1000; // Convert milliseconds to seconds
    const expirationTime = parseFloat(expirationDate);
    const bufferTimeInSeconds = 1; // Adjust the buffer time as needed

    return expirationTime - bufferTimeInSeconds <= now;
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() !== null;
  }

  private storeAuthData(data: LoginResponse) {
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('expiresAt');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('username');

    this.localStorage.store('authenticationToken', data.authenticationToken);
    this.localStorage.store('refreshToken', data.refreshToken);
    this.localStorage.store('expiresAt', data.expirationDate);
    this.localStorage.store('username', data.username);

    this.loggedIn.emit(true);
    this.userName.emit(data.username);
  }

  private clearAuthData() {
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');

    this.loggedIn.emit(false);
    this.userName.emit('');
  }
}
