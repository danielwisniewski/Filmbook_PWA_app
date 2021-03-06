import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { IgnoreMoviesListComponent } from './features/main-profile-page/pages/ignore-movies-list/ignore-movies-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/login-page/login-page.module').then(
        (m) => m.LoginPageModule
      ),
  },
  {
    path: 'movies',
    loadChildren: () =>
      import('./features/main-movies-page/main-movies-page.module').then(
        (m) => m.MainMoviesPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./features/main-search-page/main-search-page.module').then(
        (m) => m.MainSearchPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./features/main-profile-page/main-profile-page.module').then(
        (m) => m.MainProfilePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'detailView',
    loadChildren: () =>
      import(
        './features/shared-movie-detail-page/movie-detail-page.module'
      ).then((m) => m.MovieDetailPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'genre',
    loadChildren: () =>
      import(
        './features/shared-movies-by-genre-page/MoviesByGenre/MoviesByGenre.module'
      ).then((m) => m.MoviesByGenreModule),
    canActivate: [AuthGuard],
  },
  { path: 'ignore', component: IgnoreMoviesListComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      onSameUrlNavigation: 'reload',
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled'
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
