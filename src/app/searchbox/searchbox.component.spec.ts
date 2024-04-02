import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { SearchboxComponent } from './searchbox.component';

describe('SearchboxComponent', () => {
  let component: SearchboxComponent;
  let fixture: ComponentFixture<SearchboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchboxComponent, NoopAnimationsModule],
    })
      .overrideComponent(SearchboxComponent, {
        set: {
          templateUrl: '',
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(SearchboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    spyOn(component.searchChange, 'emit').and.callFake(() => '');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search value', () => {
    component.searchControl.setValue('test');
    component.onSearch();

    expect(component.searchChange.emit).toHaveBeenCalledWith('test');
  });

  it('should emit empty search value', () => {
    component.searchControl.setValue('');
    component.onSearch();

    expect(component.searchChange.emit).toHaveBeenCalledWith('');
  });

  it('should not emit search value of search value is not string', () => {
    component.searchControl.setValue(null);
    component.onSearch();

    expect(component.searchChange.emit).not.toHaveBeenCalled();
  });

  it('should clear search', () => {
    component.searchControl.setValue('test');
    component.onClear();

    expect(component.searchControl.value).toBe('');
    expect(component.searchChange.emit).toHaveBeenCalledWith('');
  });
});
