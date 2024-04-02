import { computed, inject, Injectable, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { map, Observable, switchMap } from 'rxjs';

import { ApiService } from '../../services/api.service';
import { ResponseDataModel } from '../../models/response.model';
import { TourListModel } from '../models/tour-list.model';
import { ListOptionsModel } from '../../models/list-options.model';
import { TourListFilterModel } from '../models/tour-list-filter.model';

@Injectable()
export class TourListService {
  private apiService = inject(ApiService);

  private searchSignal = signal<string>('');
  private sortSignal = signal({
    sortBy: 'name',
    order: 1,
  });
  private pagingSignal = signal({
    pageSize: 5,
    pageNumber: 1,
  });
  private filterSignal = signal({});

  private optionsSignal = computed(() => {
    const search = this.searchSignal();
    const sort = this.sortSignal();
    const paging = this.pagingSignal();
    const filter = this.filterSignal();

    return {
      search,
      sort,
      paging,
      filter,
    };
  });

  private toursList$ = toObservable(this.optionsSignal).pipe(
    switchMap(options => this.getTours(options))
  );

  public toursList = toSignal(this.toursList$, { initialValue: [] });

  public setSearch(search: string) {
    this.searchSignal.set(search);
  }

  private getTours(
    options: ListOptionsModel<TourListFilterModel>
  ): Observable<TourListModel[]> {
    return this.apiService
      .getFilteredTours(options)
      .pipe(
        map(
          (response: ResponseDataModel<TourListModel>) => response.data['data']
        )
      );
  }
}
