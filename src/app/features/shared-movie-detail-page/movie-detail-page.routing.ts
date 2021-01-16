import { Routes, RouterModule } from '@angular/router';
import { FactsPageComponent } from 'src/app/features/shared-movie-detail-page/components/facts-page/facts-page.component';
import { ResolveMovieDetailService } from 'src/app/features/shared-movie-detail-page/resolvers/resolve-movie-detail.service';
import { MovieDetailPageComponent } from './movie-detail-page.component';
import { AwardsPageComponent } from './pages/awards-page/awards-page.component';
import { AwardsResolveService } from './pages/awards-page/resolve-awards.service';
import { FullCastPageComponent } from './pages/full-cast-page/full-cast-page.component';
import { FullCastResolveService } from './pages/full-cast-page/resolve-full-cast.service';
import { SimilarMoviesComponent } from './pages/similar-movies/similar-movies.component';

const routes: Routes = [
  {
    path: ':id/fullCast',
    component: FullCastPageComponent,
    resolve: {
      cast: FullCastResolveService,
    },
  },
  {
    path: ':id/awards',
    component: AwardsPageComponent,
    resolve: {
      awards: AwardsResolveService,
    },
  },
  {
    path: ':id/facts',
    component: FactsPageComponent,
  },
  {
    path: ':id/similar',
    component: SimilarMoviesComponent,
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: MovieDetailPageComponent,
    resolve: {
      movies: ResolveMovieDetailService,
    },
  },
];

export const MovieDetailPageRoutes = RouterModule.forChild(routes);
