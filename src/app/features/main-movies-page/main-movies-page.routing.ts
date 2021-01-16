import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainMoviesPageComponent } from './main-movies-page.component';
import { EveningTvSeancesComponent } from './pages/evening-tv-seances/evening-tv-seances.component';
import { RecommendedMoviesComponent } from './pages/recommended-movies/recommended-movies.component';
import { TopMoviesComponent } from './pages/top-movies/top-movies.component';
import { TopTvSeancesComponent } from './pages/top-tv-seances/top-tv-seances.component';

const routes: Routes = [
  {
    path: '',
    component: MainMoviesPageComponent,
    children: [
      { path: '', redirectTo: 'recommended', pathMatch: 'full' },
      {
        path: 'recommended',
        component: RecommendedMoviesComponent,
      },
      { path: 'top', component: TopMoviesComponent },
      { path: 'tv', component: TopTvSeancesComponent },
      { path: 'eveningSeances', component: EveningTvSeancesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainMoviesPageRoutingModule {}
