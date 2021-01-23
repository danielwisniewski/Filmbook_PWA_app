import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FilmData } from 'src/app/core/models/film-data.model';
import { MainMoviesPageFacadeService } from '../../main-movies-page-facade.service';

@Component({
  selector: 'app-recommended-movies',
  templateUrl: './recommended-movies.component.html',
  styleUrls: ['./recommended-movies.component.css'],
})
export class RecommendedMoviesComponent implements OnInit, OnDestroy {
  sub: Subscription;
  constructor(private facadeService: MainMoviesPageFacadeService) {}

  ngOnInit(): void {
    this.sub = this.facadeService
      .getRecommenedMovies()
      .subscribe((result: FilmData[]) => {
        this.facadeService.changeCurrentList(result);
      });
  }

  ngOnDestroy(): void {
    this.facadeService.closeMiniaturesSub();
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
