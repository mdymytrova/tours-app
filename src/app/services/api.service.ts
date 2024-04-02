import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { TourListModel } from '../tour-list/models/tour-list.model';
import { ListOptionsModel } from '../models/list-options.model';
import { TourListFilterModel } from '../tour-list/models/tour-list-filter.model';
import { ResponseDataModel } from '../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  protected url = `${environment.apiUrl}`;
  private http = inject(HttpClient);

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
