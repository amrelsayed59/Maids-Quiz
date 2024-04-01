import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    children: [
      { path: '', redirectTo: 'teams', pathMatch: 'full' },
      {
        path: 'teams',
        loadChildren: () =>
          import('./pages/team/team.module').then(
            (m) => m.TeamModule
          ),
      },
    ],
  },
];

export const COMPONENTS = [LandingComponent];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingRoutingModule {}
