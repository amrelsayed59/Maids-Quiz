import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LandingLayoutComponent } from './layouts/landing-layout/landing-layout.component';
import { SharedModule } from '@shared/shared.module';
import { LeftSidebarComponent } from './layouts/landing-layout/components/left-sidebar/left-sidebar.component';
import { HeaderComponent } from './layouts/landing-layout/components/header/header.component';

const COMPONENTS = [HeaderComponent, LeftSidebarComponent];

const LAYOUTS = [AuthLayoutComponent, LandingLayoutComponent];

@NgModule({
  declarations: [...COMPONENTS, ...LAYOUTS],
  exports: [...COMPONENTS, ...LAYOUTS],
  imports: [
    CommonModule,
    SharedModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ThemeModule {}

