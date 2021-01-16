import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MainMoviesPageComponent } from './main-movies-page.component';
import { TopTvSeancesComponent } from './pages/top-tv-seances/top-tv-seances.component';
import { RecommendedMoviesComponent } from './pages/recommended-movies/recommended-movies.component';
import { TopMoviesComponent } from './pages/top-movies/top-movies.component';
import { EveningTvSeancesComponent } from './pages/evening-tv-seances/evening-tv-seances.component';
import { EveningSeanceElementComponent } from './components/movie-expandable-element/evening-seance-element.component';
import { MainMoviesPageRoutingModule } from './main-movies-page.routing';


@NgModule({
  imports: [SharedModule, MainMoviesPageRoutingModule],
  exports: [],
  declarations: [
    MainMoviesPageComponent,
    TopTvSeancesComponent,
    RecommendedMoviesComponent,
    TopMoviesComponent,
    EveningTvSeancesComponent,
    EveningSeanceElementComponent,
  ],
  providers: [],
})
export class MainMoviesPageModule {}
