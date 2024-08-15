import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  user = new BehaviorSubject<User>(null);
  private exiprationTimer;

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          environment.firebaseAPIKey,
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((data) =>
          this.handleAuthenthication(
            data.email,
            data.localId,
            data.idToken,
            Number(data.expiresIn)
          )
        )
      );
  }

  signIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          environment.firebaseAPIKey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((data) => {
          this.handleAuthenthication(
            data.email,
            data.localId,
            data.idToken,
            Number(data.expiresIn)
          );
        })
      );
  }

  logOut() {
    this.user.next(null);
    localStorage.removeItem('userData');
    if (this.exiprationTimer) clearTimeout(this.exiprationTimer);
    this.exiprationTimer.this.router.navigate(['/auth']);
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) return;

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (loadedUser.token)
      //check if token is still valid
      this.user.next(loadedUser);
    const expirationDuration =
      new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
    this.autoLogOut(expirationDuration);
  }
  autoLogOut(expirationDuration: number) {
    this.exiprationTimer = setTimeout(() => {
      this.logOut();
    }, expirationDuration);
  }

  handleError(errorRes) {
    let errorMessage = 'AN UNKOWN ERROR OCCURRED ';
    console.log(errorRes);
    if (!errorRes.error || !errorRes.error.error)
      return throwError(() => new Error(errorMessage));
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exist';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'Invalid Login Credentials';
        break;
    }
    return throwError(() => new Error(errorMessage));
  }

  private handleAuthenthication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(
      new Date().getTime() + Number(expiresIn) * 1000
    );
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogOut(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
