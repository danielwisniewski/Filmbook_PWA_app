import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FilmData } from 'src/app/core/models/film-data.model';
import { MainMoviesPageFacadeService } from '../../main-movies-page-facade.service';

@Component({
  selector: 'app-recommended-movies',
  templateUrl: './recommended-movies.component.html',
  styleUrls: ['./recommended-movies.component.css'],
})
export class RecommendedMoviesComponent implements OnInit {
  filmsData$: Observable<FilmData[]>;
  constructor(private mainMoviesPageFacadeService: MainMoviesPageFacadeService) {}

  ngOnInit(): void {
    this.filmsData$ = this.mainMoviesPageFacadeService.getRecommenedMovies();
  }

}
