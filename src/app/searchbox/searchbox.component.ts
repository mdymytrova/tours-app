import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-searchbox',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './searchbox.component.html',
  styleUrl: './searchbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchboxComponent {
  @Input() public placeholderText = 'Search...';
  @Output() public searchChange = new EventEmitter();
  public searchControl = new FormControl<string | null>(null);
  public searchValue = '';

  public onSearch(): void {
    const value = this.searchControl.value;
    if (typeof value === 'string') {
      this.searchValue = value;
      this.searchChange.emit(value.trim().toLowerCase());
    }
  }

  public onClear(): void {
    this.searchValue = '';
    this.searchControl.setValue('');
    this.searchChange.emit('');
  }
}
