import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { TourListService } from './services/tour-list.service';

@Component({
  selector: 'app-tour-list',
  standalone: true,
  providers: [TourListService],
  templateUrl: './tour-list.component.html',
  styleUrl: './tour-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TourListComponent {
  private tourListService = inject(TourListService);
  public tours = this.tourListService.toursList;
}
