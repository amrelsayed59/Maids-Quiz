import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  private user: any = {};
  public currentUser: Observable<any> = this.currentUserSubject.asObservable();

  constructor() {
    this.observeData();
  }

  observeData() {
    const authorizationData = JSON.parse(
      localStorage.getItem('AuthorizationData') || ''
    );
    this.currentUserSubject.next(authorizationData);
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  public set currentUserValue(NewValue) {
    localStorage.setItem('AuthorizationData', JSON.stringify(NewValue));
    this.observeData();
  }

  isAuthorized(allowedRoles: string[]): boolean {
    this.currentUser.subscribe((x) => (this.user = x));
    // check if the list of allowed roles is empty, if empty, authorize the user to access the page
    const currentRole = this.user.role;
    if (!currentRole) {
      return false;
    }
    // check if the user roles is in the list of allowed roles, return true if allowed and false if not allowed
    return allowedRoles.includes(currentRole);
  }
}
