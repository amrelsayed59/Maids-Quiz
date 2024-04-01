import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { Role } from '@core/data';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationGuard implements CanActivate, CanActivateChild {
  private currentRole: any;
  constructor(
    private _authService: AuthenticationService,
    private router: Router,
  ) {
    this._authService.currentUser.subscribe(user => {
      this.currentRole = user.role;
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    const allowedRoles = next.data.allowedRoles;
    const isAuthorized = this._authService.isAuthorized(allowedRoles);

    return isAuthorized;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    const allowedRoles = next.data.allowedRoles;
    const isAuthorized = this._authService.isAuthorized(allowedRoles);

    // if (!isAuthorized) {
    //   // if not authorized, show access denied message
    //   if (Role['super_admin'].includes(this.currentRole)) {
    //     this.router.navigate(['admin']);
    //   } else if (Role['org_admin'].includes(this.currentRole)) {
    //     this.router.navigate(['organization']);
    //   } else if (Role['project_admin'].includes(this.currentRole)) {
    //     this.router.navigate(['project-admin']);
    //   } else if (Role['staff'].includes(this.currentRole)) {
    //     this.router.navigate(['staff']);
    //   } else if (Role['guest'].includes(this.currentRole)) {
    //     this.router.navigate(['guest']);
    //   }
    // }

    return isAuthorized;
  }
}
