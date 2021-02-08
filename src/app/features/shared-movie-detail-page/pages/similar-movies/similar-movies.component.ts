import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilmData } from 'src/app/core/models/film-data.model';
import { FilterModel } from 'src/app/shared/models/filter.model';
import { FiltersService } from 'src/app/shared/services/filters.service';
import { UIService } from 'src/app/shared/services/ui.service';
import { MovieDetailService } from '../../movie-detail.service';

@Component({
  selector: 'app-similar-movies',
  templateUrl: './similar-movies.component.html',
  styleUrls: ['./similar-movies.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimilarMoviesComponent {
  isLoading$: Observable<boolean> = this.ui.loading;
  title$: Observable<string> = this.db
  .getLastFilmsData()
  .pipe(map((data) => data.title));
  filmData$: Observable<FilmData[]> = this.db
    .getLastFilmsData()
    .pipe(map((data) => data.similar));

  constructor(
    private db: MovieDetailService,
    private ui: UIService,
    private filterService: FiltersService,
    public location: Location
  ) {
    this.filterService.activeMoviesElementsSize.next('col-12');
    this.filterService.activeFilter.next(new FilterModel());
  }
}
