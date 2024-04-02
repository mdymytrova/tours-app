import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';
import { TourListMock } from '../mocks/tour-list.mock';
import { ResponseDataModel } from '../models/response.model';
import { TourListModel } from '../tour-list/models/tour-list.model';
import { ListOptionsModel } from '../models/list-options.model';
import { TourListFilterModel } from '../tour-list/models/tour-list-filter.model';

describe('ApiService', () => {
  let service: ApiService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(ApiService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should get tours', () => {
    const testData = {
      status: 'success',
      data: {
        data: TourListMock,
      },
    };
    service.getTours().subscribe(res => {
      expect(res.data['data'].length).toBe(TourListMock.length);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${environment.apiUrl}/tours`,
    });

    req.flush(testData);
  });

  it('should get tours with options', () => {
    const testData: ResponseDataModel<TourListModel> = {
      status: 'success',
      data: {
        data: TourListMock,
      },
    };

    const testOptions: ListOptionsModel<TourListFilterModel> = {
      search: 'test',
    };
    service.getFilteredTours(testOptions).subscribe(res => {
      expect(res.data['data'].length).toBe(TourListMock.length);
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${environment.apiUrl}/tours/tours-filter`,
    });

    expect(req.request.body).toEqual(testOptions);

    req.flush(testData);
  });
});
