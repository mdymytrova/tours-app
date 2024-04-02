import { PagingModel } from './paging.model';
import { SortModel } from './sort.model';

export interface ListOptionsModel<T> {
  filter?: T;
  sort?: SortModel;
  paging?: PagingModel;
  search?: string;
}
