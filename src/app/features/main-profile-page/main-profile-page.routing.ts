import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainProfilePageComponent } from './main-profile-page.component';
import { IgnoreMoviesListComponent } from './pages/ignore-movies-list/ignore-movies-list.component';
import { SeenMoviesComponent } from './pages/seen-movies/seen-movies.component';
import { WatchlistComponent } from './pages/watchlist/watchlist.component';

const routes: Routes = [
  {
    path: '',
    component: MainProfilePageComponent,
    children: [
      { path: '', redirectTo: 'watchlist', pathMatch: 'full' },
      { path: 'watchlist', component: WatchlistComponent },
      { path: 'seen', component: SeenMoviesComponent },
    ],
  },
  // { path: 'ignore', component: IgnoreMoviesListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainProfilePageRoutingModule {}
