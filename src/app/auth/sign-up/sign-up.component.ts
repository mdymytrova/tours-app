import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatInput } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import {
  ResponseErrorModel,
  ResponseLoginModel,
} from '../../models/response.model';
import { AuthService } from '../auth.service';
import { SignupFormModel } from './sign-up-form.model';
import { PasswordConfirmValidator } from './pasword-confirm.validator';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInput, MatButtonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);

  public authError = this.authService.authError;

  public signupForm = this.formBuilder.group(
    {
      username: [''],
      firstName: [''],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', [Validators.required]],
    },
    {
      validator: PasswordConfirmValidator(),
    }
  );

  public onSignup() {
    if (this.signupForm.valid) {
      this.authService
        .signup(this.signupForm.value as SignupFormModel)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((response: ResponseErrorModel | ResponseLoginModel) => {
          if ((response as ResponseErrorModel).error) {
            this.signupForm.setErrors({ invalidForm: true });
            this.signupForm.markAllAsTouched();
          }
        });
    }
  }
}
