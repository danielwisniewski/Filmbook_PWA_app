import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileDetailBottomSheetComponent } from './components/profile-detail-bottom-sheet/profile-detail-bottom-sheet.component';
import { MainProfilePageComponent } from './main-profile-page.component';
import { MainProfilePageRoutingModule } from './main-profile-page.routing';
import { IgnoreMoviesListComponent } from './pages/ignore-movies-list/ignore-movies-list.component';
import { SeenMoviesComponent } from './pages/seen-movies/seen-movies.component';
import { WatchlistComponent } from './pages/watchlist/watchlist.component';

@NgModule({
  imports: [SharedModule, MainProfilePageRoutingModule],
  exports: [],
  declarations: [
    MainProfilePageComponent,
    SeenMoviesComponent,
    WatchlistComponent,
    ProfileDetailBottomSheetComponent,
    IgnoreMoviesListComponent,
  ],
  providers: [],
  entryComponents: [ProfileDetailBottomSheetComponent],
})
export class MainProfilePageModule {}
