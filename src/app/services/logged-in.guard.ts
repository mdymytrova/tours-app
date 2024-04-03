import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

export const LoggedInGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isActiveSession = authService.isSessionValid();

  if (isActiveSession) {
    router.navigate(['/']);
  }

  return !isActiveSession;
};
