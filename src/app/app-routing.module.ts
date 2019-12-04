import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: (): Promise<any> =>
      import('./modules/dashboard/dashboard.module').then((module) => module.DashboardModule)
  },
  {
    path: 'favorites',
    loadChildren: (): Promise<any> =>
      import('./modules/favorites/favorites.module').then((module) => module.FavoritesModule)
  },
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      onSameUrlNavigation: 'reload'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
