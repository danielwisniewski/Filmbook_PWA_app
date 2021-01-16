import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FilmData } from 'src/app/core/models/film-data.model';
import { MainMoviesPageFacadeService } from '../../main-movies-page-facade.service';

@Component({
  selector: 'app-top',
  templateUrl: './top-movies.component.html',
  styleUrls: ['./top-movies.component.css'],
})
export class TopMoviesComponent implements OnInit {
  filmsData$: Observable<FilmData[]>;

  constructor(
    private mainMoviesPageFacadeService: MainMoviesPageFacadeService
  ) {}

  ngOnInit(): void {
    this.filmsData$ = this.mainMoviesPageFacadeService.getTopRated();
  }
}
