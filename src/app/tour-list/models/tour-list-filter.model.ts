import { TourLevelEnum } from '../../enums/tour-level.enum';
import { FilterRangeModel } from '../../models/filter-range.model';

export interface TourListFilterModel {
  level?: TourLevelEnum;
  duration?: FilterRangeModel;
  price?: FilterRangeModel;
  rating?: FilterRangeModel;
}
