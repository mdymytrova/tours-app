import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, tap } from 'rxjs';
import { DateTime } from 'luxon';

import { ApiService } from '../services/api.service';
import {
  ResponseErrorModel,
  ResponseLoginModel,
} from '../models/response.model';
import { StorageKeyEnum } from '../enums/storage-key.enum';
import { UserModel } from '../models/user.model';
import { SignupFormModel } from './sign-up/sign-up-form.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiService = inject(ApiService);
  private router = inject(Router);
  private authErrorSignal = signal('');
  private currentUserSignal = signal<UserModel | null>(null);

  public authError = this.authErrorSignal.asReadonly();
  public currentUser = this.currentUserSignal.asReadonly();

  public login(
    email: string,
    password: string
  ): Observable<ResponseErrorModel | ResponseLoginModel> {
    return this.apiService.login(email, password).pipe(
      tap(response => {
        if ((response as ResponseErrorModel).error) {
          this.onLoginError(response as ResponseErrorModel);
        } else {
          this.onLoginSuccess(response as ResponseLoginModel);
        }
      })
    );
  }

  public signup(
    signupData: SignupFormModel
  ): Observable<ResponseErrorModel | ResponseLoginModel> {
    return this.apiService.signup(signupData).pipe(
      tap(response => {
        if ((response as ResponseErrorModel).error) {
          this.onLoginError(response as ResponseErrorModel);
        } else {
          this.onLoginSuccess(response as ResponseLoginModel);
        }
      })
    );
  }

  public logout() {
    this.clearUserData();
    this.router.navigate(['/']);
  }

  public setCurrentUser(): void {
    const user = localStorage.getItem(StorageKeyEnum.User);

    if (user && this.isSessionValid()) {
      this.currentUserSignal.set(JSON.parse(user));
    } else {
      this.clearUserData();
    }
  }

  public isSessionValid(): boolean {
    const savedExpirationAt = localStorage.getItem(StorageKeyEnum.ExpirationAt);
    const expirationAt = savedExpirationAt && JSON.parse(savedExpirationAt);

    return expirationAt && expirationAt > DateTime.now().valueOf();
  }

  private onLoginSuccess(response: ResponseLoginModel): void {
    const { user, token, expiresInSeconds } = (response as ResponseLoginModel)
      .data;
    this.setUserSession(user, token, expiresInSeconds);
    this.setCurrentUser();
    this.authErrorSignal.set('');
    this.router.navigate(['/']);
  }

  private onLoginError(response: ResponseErrorModel): void {
    this.clearUserData();
    this.authErrorSignal.set(response.message);
  }

  private setUserSession(
    user: UserModel,
    token: string,
    expiresInSeconds: number
  ): void {
    const expirationTime = DateTime.now()
      .plus({ seconds: expiresInSeconds })
      .valueOf();

    localStorage.setItem(StorageKeyEnum.User, JSON.stringify(user));
    localStorage.setItem(StorageKeyEnum.Token, token);
    localStorage.setItem(
      StorageKeyEnum.ExpirationAt,
      JSON.stringify(expirationTime)
    );
  }

  private clearUserData(): void {
    this.currentUserSignal.set(null);
    localStorage.removeItem(StorageKeyEnum.Token);
    localStorage.removeItem(StorageKeyEnum.ExpirationAt);
    localStorage.removeItem(StorageKeyEnum.User);
  }
}
