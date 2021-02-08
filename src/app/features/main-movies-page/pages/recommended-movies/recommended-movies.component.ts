import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FilmData } from 'src/app/core/models/film-data.model';
import { MainMoviesPageFacadeService } from '../../main-movies-page-facade.service';

@Component({
  selector: 'app-recommended-movies',
  templateUrl: './recommended-movies.component.html',
  styleUrls: ['./recommended-movies.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecommendedMoviesComponent {
  constructor(private facadeService: MainMoviesPageFacadeService) {}
  filmData: Observable<FilmData[]> = this.facadeService.getRecommendedMovies();
}
