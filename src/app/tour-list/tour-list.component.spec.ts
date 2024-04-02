import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { TourListComponent } from './tour-list.component';
import { TourListMock } from '../mocks/tour-list.mock';
import { TourListService } from './services/tour-list.service';

describe('TourListComponent', () => {
  let component: TourListComponent;
  let fixture: ComponentFixture<TourListComponent>;
  let tourListService: jasmine.SpyObj<TourListService>;

  beforeEach(async () => {
    tourListService = jasmine.createSpyObj('TourListService', [], {
      toursList: signal(TourListMock),
    });

    await TestBed.configureTestingModule({
      imports: [TourListComponent, NoopAnimationsModule],
    })
      .overrideComponent(TourListComponent, {
        set: {
          templateUrl: '',
          providers: [
            {
              provide: TourListService,
              useValue: tourListService,
            },
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(TourListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have tour list defined', () => {
    expect(component.tours().length).toBe(TourListMock.length);
  });
});
