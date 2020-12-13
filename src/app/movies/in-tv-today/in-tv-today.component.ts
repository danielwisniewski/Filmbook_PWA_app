import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FilmData } from 'src/app/shared/Models/film-data.model';
import { MoviesInTvService } from './movies-in-tv.service';


@Component({
  selector: 'app-in-tv-today',
  templateUrl: './in-tv-today.component.html',
  styleUrls: ['./in-tv-today.component.css'],
})
export class InTvTodayComponent implements OnInit, OnDestroy {
  filmsData: FilmData[];
  isLoading: boolean;
  sub: Subscription;
  constructor(private movieService: MoviesInTvService) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.movieService.filmsInTv.subscribe((val: FilmData[]) => {
      this.isLoading = false;
      this.filmsData = val;
    });
    this.movieService.fetchFilmsInTv();
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
