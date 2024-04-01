import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Role } from '@core/data/role';

@Injectable({ providedIn: 'root' })

export class ActiveGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isActivated = this.authenticationService.currentUserValue.active;
    if (isActivated) {
      return true;
    }
      
    return false;
  }

}
