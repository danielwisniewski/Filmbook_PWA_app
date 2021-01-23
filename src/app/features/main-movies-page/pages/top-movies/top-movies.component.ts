import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FilmData } from 'src/app/core/models/film-data.model';
import { MainMoviesPageFacadeService } from '../../main-movies-page-facade.service';

@Component({
  selector: 'app-top',
  templateUrl: './top-movies.component.html',
  styleUrls: ['./top-movies.component.css'],
})
export class TopMoviesComponent implements OnInit, OnDestroy {
  filmsData$: Observable<FilmData[]>;
  sub: Subscription;
  constructor(
    private facadeService: MainMoviesPageFacadeService
  ) {}

  ngOnInit(): void {
    this.sub = this.facadeService
      .getTopRated()
      .subscribe((result: FilmData[]) => {
        this.facadeService.changeCurrentList(result);
      });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.facadeService.closeMiniaturesSub();
      this.sub.unsubscribe();
    }
  }
}
