import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, first, map, take } from 'rxjs/operators';
import { FilmData } from 'src/app/shared/Models/film-data.model';
import { FirestoreMoviesService } from 'src/app/shared/services/firestore-movies.service';
import { MoviesServiceService } from '../movies-service.service';

@Component({
  selector: 'app-in-tv-today',
  templateUrl: './in-tv-today.component.html',
  styleUrls: ['./in-tv-today.component.css'],
})
export class InTvTodayComponent implements OnInit {
  filmsData: FilmData[];
  isLoading = false;
  constructor(private movieService: MoviesServiceService) {}

  ngOnInit(): void {
    this.isLoading = true;
    if (!this.movieService.filmsInTv.value) {
      this.movieService.fetchFilmsInTv();
    }
    this.movieService.filmsInTv
      .pipe(
        first( val => val !== null ),
        finalize(() => (this.isLoading = false))
      )
      .subscribe((val: FilmData[]) => {
        this.filmsData = val;
      });
  }
}
