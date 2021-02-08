import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { combineLatest, Observable } from 'rxjs';
import { map, shareReplay, throttleTime } from 'rxjs/operators';
import { FilmData } from 'src/app/core/models/film-data.model';

@Injectable({
  providedIn: 'root',
})
export class TopMoviesService {

  constructor(private firestore: AngularFirestore) {
    this.fetchTopMovies();
    this.fetchTopSerials();
  }

  fetchTopRated(): Observable<FilmData[]> {
    return combineLatest([this.fetchTopMovies(), this.fetchTopSerials()]).pipe(
      map(([movies, serials]) => [...movies, ...serials] as FilmData[])
    );
  }

  private fetchTopMovies(): Observable<FilmData[]> {
    return this.firestore
      .collection('movies', (ref) =>
        ref.where('type', '==', 'film').orderBy('rating', 'desc').limit(100)
      )
      .valueChanges()
      .pipe(throttleTime(5000), shareReplay(1));
  }

  private fetchTopSerials(): Observable<FilmData[]> {
    return this.firestore
      .collection('movies', (ref) =>
        ref.where('type', '==', 'serial').orderBy('rating', 'desc').limit(100)
      )
      .valueChanges()
      .pipe(throttleTime(5000), shareReplay(1));
  }
}
