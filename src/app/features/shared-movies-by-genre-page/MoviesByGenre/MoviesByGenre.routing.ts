import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesByGenreComponent } from './MoviesByGenre.component';

const routes: Routes = [
  {
    path: ':id',
    component: MoviesByGenreComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesByGenreRoutes {}
