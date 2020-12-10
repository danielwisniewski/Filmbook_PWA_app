import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile.component';
import { SeenMoviesComponent } from './seen-movies/seen-movies.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { ProfileDetailBottomSheetComponent } from './profile-detail-bottom-sheet/profile-detail-bottom-sheet.component';

@NgModule({
    imports: [SharedModule],
    exports: [],
    declarations: [ProfileComponent, SeenMoviesComponent, WatchlistComponent, ProfileDetailBottomSheetComponent],
    providers: [],
    entryComponents: [ProfileDetailBottomSheetComponent]
})
export class ProfileModule { }
