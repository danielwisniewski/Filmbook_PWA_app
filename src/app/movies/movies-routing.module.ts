import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { EveningSeancesComponent } from './in-tv-today/evening-seances/evening-seances.component';
import { InTvTodayComponent } from './in-tv-today/in-tv-today.component';
import { MoviesComponent } from './movies.component';
import { RecommendedComponent } from './recommended/recommended.component';
import { TopComponent } from './top/top.component';

export const routes: Routes = [
  {
    path: 'movies',
    component: MoviesComponent,
    children: [
      { path: '', redirectTo: 'recommended', pathMatch: 'full' },
      {
        path: 'recommended',
        component: RecommendedComponent,
      },
      { path: 'top', component: TopComponent },
      { path: 'tv', component: InTvTodayComponent },
      { path: 'eveningSeances', component: EveningSeancesComponent },
    ],
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class MoviesRoutingModule {}
