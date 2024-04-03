import { FormGroup } from '@angular/forms';

export const PasswordConfirmValidator = (): ((
  formGroup: FormGroup
) => void) => {
  return (formGroup: FormGroup) => {
    const passwordControl = formGroup.get('password');
    const passwordConfirmControl = formGroup.get('passwordConfirm');

    if (passwordControl?.value && passwordConfirmControl?.value) {
      if (passwordControl.value !== passwordConfirmControl.value) {
        passwordConfirmControl.setErrors({
          notConfirmed: true,
        });
      } else {
        passwordConfirmControl.setErrors(null);
      }
    }
  };
};
