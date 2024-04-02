import { SortOrderEnum } from '../enums/sort-order.enum';

export interface SortModel {
  sortBy: string;
  order: SortOrderEnum;
}
