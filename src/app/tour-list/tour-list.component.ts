import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { TourListService } from './services/tour-list.service';
import { SearchboxComponent } from '../searchbox/searchbox.component';

@Component({
  selector: 'app-tour-list',
  standalone: true,
  imports: [SearchboxComponent],
  providers: [TourListService],
  templateUrl: './tour-list.component.html',
  styleUrl: './tour-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TourListComponent {
  private tourListService = inject(TourListService);
  public tours = this.tourListService.toursList;

  public onSearch(search: string): void {
    this.tourListService.setSearch(search);
  }
}
