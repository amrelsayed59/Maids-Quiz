import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ThemeModule } from '@theme/theme.module';
import { LandingRoutingModule, COMPONENTS } from './main-routing.module';

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, LandingRoutingModule, ThemeModule, SharedModule],
  providers: [],
})
export class MainModule {}
