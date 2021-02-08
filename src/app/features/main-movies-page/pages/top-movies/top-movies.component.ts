import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FilmData } from 'src/app/core/models/film-data.model';
import { MainMoviesPageFacadeService } from '../../main-movies-page-facade.service';

@Component({
  selector: 'app-top',
  templateUrl: './top-movies.component.html',
  styleUrls: ['./top-movies.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopMoviesComponent {
  constructor(private facadeService: MainMoviesPageFacadeService) {}

  filmsData$: Observable<FilmData[]> = this.facadeService.getTopRated();
}
