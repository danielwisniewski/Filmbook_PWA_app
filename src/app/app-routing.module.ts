import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginPageComponent } from './features/login-page/login-page.component';
import { GenreListComponent } from './shared/components/genre-list/genre-list.component';
import { ResolveGenreService } from './shared/services/resolve-genre.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  {
    path: 'movies',
    loadChildren: () =>
      import('./features/main-movies-page/main-movies-page.module').then(
        (m) => m.MainMoviesPageModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./features/main-search-page/main-search-page.module').then(
        (m) => m.MainSearchPageModule
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./features/main-profile-page/main-profile-page.module').then(
        (m) => m.MainProfilePageModule
      ),
    // canLoad: [AuthGuard],
  },
  {
    path: 'detailView',
    loadChildren: () =>
      import(
        './features/shared-movie-detail-page/movie-detail-page.module'
      ).then((m) => m.MovieDetailPageModule),
  },
  {
    path: 'genre/:id',
    component: GenreListComponent,
    resolve: {
      movies: ResolveGenreService,
    },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
