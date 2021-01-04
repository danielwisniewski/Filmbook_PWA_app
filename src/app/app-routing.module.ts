import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { IgnoreMoviesListComponent } from './profile/ignore-movies-list/ignore-movies-list.component';
import { ProfileComponent } from './profile/profile.component';
import { SeenMoviesComponent } from './profile/seen-movies/seen-movies.component';
import { WatchlistComponent } from './profile/watchlist/watchlist.component';
import { SearchComponent } from './search/search.component';
import { GenreListComponent } from './shared/components/genre-list/genre-list.component';
import { MovieDetailPageComponent } from './shared/components/movie-detail-page/movie-detail.component';
import { ResolveGenreService } from './shared/services/resolve-genre.service';


const routes: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'search',
    component: SearchComponent,
    children: [{ path: 'view/:id', component: MovieDetailPageComponent }],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'watchlist', pathMatch: 'full' },
      { path: 'watchlist', component: WatchlistComponent },
      { path: 'seen', component: SeenMoviesComponent },
    ],
  },
  { path: 'ignore', component: IgnoreMoviesListComponent },
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
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
