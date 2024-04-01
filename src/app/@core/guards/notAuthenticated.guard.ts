import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Role } from '@core/data/role';

@Injectable({ providedIn: 'root' })
export class NotAuthenticatedGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser: any = this.authenticationService.currentUserValue;
    if (!currentUser) {
      return false;
    } else {
      return true;
    }
  }
}
