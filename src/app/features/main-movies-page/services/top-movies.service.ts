import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap, throttleTime } from 'rxjs/operators';
import { FilmData } from 'src/app/core/models/film-data.model';

@Injectable({
  providedIn: 'root'
})
export class TopMoviesService {
  private topMovies: FilmData[];
  private topSerials: FilmData[];
  topRated$ = new BehaviorSubject<FilmData[]>(null);

  constructor(private firestore: AngularFirestore) {
    this.fetchTopMovies();
    this.fetchTopSerials();
  }

  private fetchTopMovies(): void {
    this.firestore
      .collection('movies', (ref) =>
        ref.where('type', '==', 'film').orderBy('rating', 'desc').limit(100)
      )
      .valueChanges()
      .pipe(
        throttleTime(5000),
        tap((topMovies: FilmData[]) => {
          this.topMovies = topMovies;
          this.updateTopRated();
        })
      )
      .subscribe();
  }

  private fetchTopSerials(): void {
    this.firestore
      .collection('movies', (ref) =>
        ref.where('type', '==', 'serial').orderBy('rating', 'desc').limit(100)
      )
      .valueChanges()
      .pipe(
        throttleTime(5000),
        tap((topSerials: FilmData[]) => {
          this.topSerials = topSerials;
          this.updateTopRated();
        })
      )
      .subscribe();
  }

  private updateTopRated(): void {
    if ( this.topMovies && this.topSerials ) {
      this.topRated$.next(this.topMovies.concat(this.topSerials));
    }
  }
}
