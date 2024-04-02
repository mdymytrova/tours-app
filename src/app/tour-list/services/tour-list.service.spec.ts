import { TestBed } from '@angular/core/testing';

import { of } from 'rxjs';

import { TourListService } from './tour-list.service';
import { TourListMock } from '../../mocks/tour-list.mock';
import { ApiService } from '../../services/api.service';

describe('TourListService', () => {
  let service: TourListService;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    apiService = jasmine.createSpyObj('ApiService', ['getFilteredTours']);
    apiService.getFilteredTours.and.returnValue(
      of({
        status: 'success',
        data: {
          data: TourListMock,
        },
      })
    );

    TestBed.configureTestingModule({
      providers: [
        TourListService,
        {
          provide: ApiService,
          useValue: apiService,
        },
      ],
    });

    service = TestBed.inject(TourListService);
  });

  it('should call api service on search signal change', () => {
    service.setSearch('test');

    TestBed.flushEffects();

    expect(apiService.getFilteredTours).toHaveBeenCalledWith(
      jasmine.objectContaining({ search: 'test' })
    );

    expect(service.toursList().length).toBe(TourListMock.length);
  });
});
