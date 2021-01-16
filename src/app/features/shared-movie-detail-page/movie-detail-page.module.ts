import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { FactsPageComponent } from './components/facts-page/facts-page.component';
import { InitialViewComponent } from './components/initial-view/initial-view.component';
import { OverviewComponent } from './components/overview/overview.component';
import { StreamingServicesComponent } from './components/streaming-services/streaming-services.component';
import { TvSeancesComponent } from './components/tv-seances/tv-seances.component';
import { MovieDetailPageComponent } from './movie-detail-page.component';
import { MovieDetailPageRoutes } from './movie-detail-page.routing';
import { AwardsPageComponent } from './pages/awards-page/awards-page.component';
import { FullCastPageComponent } from './pages/full-cast-page/full-cast-page.component';
import { SimilarMoviesComponent } from './pages/similar-movies/similar-movies.component';

@NgModule({
  imports: [SharedModule, MovieDetailPageRoutes],
  exports: [],
  declarations: [
    AwardsPageComponent,
    FullCastPageComponent,
    SimilarMoviesComponent,
    FactsPageComponent,
    InitialViewComponent,
    OverviewComponent,
    StreamingServicesComponent,
    TvSeancesComponent,
    MovieDetailPageComponent
  ],
  providers: [],
})
export class MovieDetailPageModule {}
