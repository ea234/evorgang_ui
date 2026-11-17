
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './user.service';

export const authGuard: CanActivateFn = (_, state) => {

  const userService = inject( UserService );

  const router = inject( Router );

  if ( userService.isAuthenticated() ) 
  {
    return true;
  }

  return router.createUrlTree( ['/login'], { queryParams: { returnUrl: state.url } } );
};
