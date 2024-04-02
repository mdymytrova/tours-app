import { TourLevelEnum } from '../../enums/tour-level.enum';

export interface TourListModel {
  id: string;
  name: string;
  duration: number;
  maxGroupSize: number;
  level: TourLevelEnum;
  ratingAvg: number;
  ratingQty: number;
  price: number;
  summary: string;
  imageCover: string;
  startLocation: string;
  stops: number;
  startDate: string;
  slug: string;
}
