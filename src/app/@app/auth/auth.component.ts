import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  styleUrls: ['./auth.component.scss'],
  template: `
    <app-auth-layout>
      <router-outlet></router-outlet>
    </app-auth-layout>
  `,
})
export class AuthComponent {
  constructor() {}
}
