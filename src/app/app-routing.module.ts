import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('@app/auth/auth.module').then((m) => m.AuthModule),
    // canActivate: [NotAuthenticatedGuard],
  },
  {
    path: 'campaign',
    loadChildren: () =>
      import('@app/main/main.module').then((m) => m.MainModule),
  },

  {
    path: '',
    redirectTo: 'campaign',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: 'campaign' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
[]