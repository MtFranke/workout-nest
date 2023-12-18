import { inject } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';

import { AuthService } from '../services/auth.service';

export const authGuard : CanActivateFn = ( route: ActivatedRouteSnapshot,
                                           state: RouterStateSnapshot) =>
{
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    console.log('Successfully checked token validity.')
    return true;
  }

  alert('No active session found. Please log in again to continue.');
  // Redirect to the login page
  return router.parseUrl('/login');
};
