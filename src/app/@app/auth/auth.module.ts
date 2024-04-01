import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ThemeModule } from '@theme/theme.module';
import { AuthRoutingModule, COMPONENTS } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
    ...COMPONENTS,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ThemeModule,
    SharedModule,
  ],
  providers: [],
})
export class AuthModule { }
