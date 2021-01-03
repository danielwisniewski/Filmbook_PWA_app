import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AwardsPageComponent } from "./components/movie-detail-page/awards-page/awards-page.component";
import { AwardsResolveService } from "./components/movie-detail-page/awards-page/resolve-awards.service";
import { FullCastPageComponent } from "./components/movie-detail-page/full-cast-page/full-cast-page.component";
import { FullCastResolveService } from "./components/movie-detail-page/full-cast-page/resolve-full-cast.service";
import { FactsPageComponent } from "./components/movie-detail-page/movie-detail-page-elements/facts-page/facts-page.component"
import { SimilarMoviesComponent } from "./components/movie-detail-page/movie-detail-page-elements/similar-movies/similar-movies.component";
import { MovieDetailPageComponent } from "./components/movie-detail-page/movie-detail.component";
import { ResolveMovieDetailService } from "./services/resolve-movie-detail.service";

export const routes: Routes = [
  {
    path: 'detailView/:id/fullCast',
    component: FullCastPageComponent,
    resolve: {
      cast: FullCastResolveService
    }
  },
  {
    path: 'detailView/:id/awards',
    component: AwardsPageComponent,
    resolve: {
      awards: AwardsResolveService
    }
  },
  {
    path: 'detailView/:id/facts',
    component: FactsPageComponent,
  },
  {
    path: 'detailView/:id/similar',
    component: SimilarMoviesComponent,
  },
  {
    path: 'detailView/:id',
    pathMatch: "full",
    component: MovieDetailPageComponent,
    resolve: {
      movies: ResolveMovieDetailService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class SharedRoutingModule {}

