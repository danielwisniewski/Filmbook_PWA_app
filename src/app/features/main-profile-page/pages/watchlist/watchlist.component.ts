import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FilmData } from 'src/app/core/models/film-data.model';
import { MainProfilePageFacadeService } from '../../main-profile-page-facade.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WatchlistComponent {
  constructor(private facadeService: MainProfilePageFacadeService) {}

  filmData$: Observable<FilmData[]> = this.facadeService.getMoviesOnWatchList();
}
