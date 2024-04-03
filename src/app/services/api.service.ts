import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { catchError, Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';
import { TourListModel } from '../tour-list/models/tour-list.model';
import { ListOptionsModel } from '../models/list-options.model';
import { TourListFilterModel } from '../tour-list/models/tour-list-filter.model';
import {
  ResponseDataModel,
  ResponseErrorModel,
  ResponseLoginModel,
} from '../models/response.model';
import { SignupFormModel } from '../auth/sign-up/sign-up-form.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  protected url = `${environment.apiUrl}`;
  private http = inject(HttpClient);

  public login(
    email: string,
    password: string
  ): Observable<ResponseErrorModel | ResponseLoginModel> {
    return this.http
      .post<ResponseErrorModel | ResponseLoginModel>(
        `${this.url}/users/login`,
        {
          email,
          password,
        }
      )
      .pipe(catchError(error => of(error.error)));
  }

  public signup(
    signUpData: SignupFormModel
  ): Observable<ResponseErrorModel | ResponseLoginModel> {
    return this.http
      .post<
        ResponseErrorModel | ResponseLoginModel
      >(`${this.url}/users/signup`, signUpData)
      .pipe(catchError(error => of(error.error)));
  }

  public getTours(): Observable<ResponseDataModel<TourListModel>> {
    return this.http.get<ResponseDataModel<TourListModel>>(`${this.url}/tours`);
  }

  public getFilteredTours(
    options: ListOptionsModel<TourListFilterModel>
  ): Observable<ResponseDataModel<TourListModel>> {
    return this.http.post<ResponseDataModel<TourListModel>>(
      `${this.url}/tours/tours-filter`,
      options
    );
  }
}
