import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { InTvTodayComponent } from './movies/in-tv-today/in-tv-today.component';
import { MoviesComponent } from './movies/movies.component';
import { RecommendedComponent } from './movies/recommended/recommended.component';
import { TopComponent } from './movies/top/top.component';
import { ProfileComponent } from './profile/profile.component';
import { SeenMoviesComponent } from './profile/seen-movies/seen-movies.component';
import { WatchlistComponent } from './profile/watchlist/watchlist.component';
import { SearchComponent } from './search/search.component';
import { GenreListComponent } from './shared/components/genre-list/genre-list.component';
import { AwardsPageComponent } from './shared/components/movie-detail-page/awards-page/awards-page.component';
import { AwardsResolveService } from './shared/components/movie-detail-page/awards-page/resolve-awards.service';
import { FullCastPageComponent } from './shared/components/movie-detail-page/full-cast-page/full-cast-page.component';
import { FullCastResolveService } from './shared/components/movie-detail-page/full-cast-page/resolve-full-cast.service';
import { MovieDetailPageComponent } from './shared/components/movie-detail-page/movie-detail.component';
import { ResolveGenreService } from './shared/services/resolve-genre.service';
import { ResolveMovieDetailService } from './shared/services/resolve-movie-detail.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'movies',
    component: MoviesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'recommended', pathMatch: 'full' },
      { path: 'recommended', component: RecommendedComponent },
      { path: 'top', component: TopComponent },
      { path: 'tv', component: InTvTodayComponent },
    ],
  },
  {
    path: 'search',
    component: SearchComponent,
    canActivate: [AuthGuard],
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
  {
    path: 'detailView/:id',
    component: MovieDetailPageComponent,
    canActivate: [AuthGuard],
    resolve: {
      movies: ResolveMovieDetailService,
    },
  },
  {
    path: 'detailView/:id/awards',
    component: AwardsPageComponent,
    resolve: {
      awards: AwardsResolveService
    }
  },
  {
    path: 'detailView/:id/fullCast',
    component: FullCastPageComponent,
    resolve: {
      cast: FullCastResolveService
    }
  },
  {
    path: 'genre/:id',
    component: GenreListComponent,
    canActivate: [AuthGuard],
    resolve: {
      movies: ResolveGenreService,
    },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
