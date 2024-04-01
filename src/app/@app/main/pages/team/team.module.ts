import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamRoutingModule } from './team-routing.module';
import { TeamComponent } from './team.component';
import { UserListComponent } from './user-list/user-list.component';
import { SharedModule } from '@shared/shared.module';
import { ThemeModule } from '@theme/theme.module';
import { UserDetailsComponent } from './user-details/user-details.component';

@NgModule({
  declarations: [
    TeamComponent,
    UserListComponent,
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ThemeModule,
    TeamRoutingModule
  ],
})
export class TeamModule { }
