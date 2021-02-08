import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FilmData } from 'src/app/core/models/film-data.model';
import { MoviesByGenreFacadeService } from './MoviesByGenreFacade.service';

@Component({
  selector: 'app-MoviesByGenre',
  templateUrl: './MoviesByGenre.component.html',
  styleUrls: ['./MoviesByGenre.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesByGenreComponent {
  filmsData$: Observable<FilmData[]> = this.facadeService.getFilmsData();
  id: string;
  constructor(
    private route: ActivatedRoute,
    private facadeService: MoviesByGenreFacadeService,
    public location: Location
  ) {
    this.id = this.route.snapshot.params['id'];
    this.facadeService.changeId(this.id);
  }
}
