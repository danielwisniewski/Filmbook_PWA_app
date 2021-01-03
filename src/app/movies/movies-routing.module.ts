import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { SharedModule } from '../shared/shared.module';
import { InTvTodayComponent } from './in-tv-today/in-tv-today.component';
import { MoviesComponent } from './movies.component';
import { RecommendedComponent } from './recommended/recommended.component';
import { TopComponent } from './top/top.component';

export const routes: Routes = [
  {
    path: 'movies',
    component: MoviesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'recommended', pathMatch: 'full' },
      {
        path: 'recommended',
        component: RecommendedComponent,
      },
      { path: 'top', component: TopComponent },
      { path: 'tv', component: InTvTodayComponent },
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
