import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResolveGenreService } from 'src/app/features/shared-movies-by-genre-page/MoviesByGenre/resolvers/resolve-genre.service';
import { MoviesByGenreComponent } from './MoviesByGenre.component';

const routes: Routes = [
  {
    path: ':id',
    component: MoviesByGenreComponent,
    resolve: {
      movies: ResolveGenreService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesByGenreRoutes {}
