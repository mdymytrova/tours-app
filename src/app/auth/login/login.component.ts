import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../auth.service';
import {
  ResponseErrorModel,
  ResponseLoginModel,
} from '../../models/response.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    MatButtonModule,
    JsonPipe,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);

  public authError = this.authService.authError;

  public loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  public onLogin() {
    const { email, password } = this.loginForm.value;
    this.authService
      .login(email as string, password as string)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((response: ResponseErrorModel | ResponseLoginModel) => {
        if ((response as ResponseErrorModel).error) {
          this.loginForm.setErrors({ invalidForm: true });
          this.loginForm.markAllAsTouched();
        }
      });
  }
}
