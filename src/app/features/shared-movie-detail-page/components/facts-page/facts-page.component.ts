import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FilmData } from 'src/app/core/models/film-data.model';
import { MovieDetailService } from '../../movie-detail.service';

@Component({
  selector: 'app-facts-page',
  templateUrl: './facts-page.component.html',
  styleUrls: ['./facts-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FactsPageComponent {
  filmData$: Observable<FilmData> = this.db.getLastFilmsData();
  constructor(
    public location: Location,
    private db: MovieDetailService,
  ) {}
}
