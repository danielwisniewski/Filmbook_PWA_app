import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { combineLatest, Observable, Subject } from 'rxjs';
import { throttleTime, map, takeUntil } from 'rxjs/operators';
import { FilmData } from 'src/app/core/models/film-data.model';

@Injectable({
  providedIn: 'root',
})
export class FetchUserMoviesListsService {
  cancelSub$ = new Subject<boolean>();
  
  constructor(private firestore: AngularFirestore) {
    this.fetchWatchlist();
    this.fetchSeenMovies();
    this.fetchIgnore();
  }

  fetchSeenMovies(): Observable<FilmData[]> {
    return this.firestore
      .collection('users/' + localStorage.getItem('userId') + '/seen'
      )
      .valueChanges()
      .pipe(throttleTime(5000));
  }

  fetchWatchlist(): Observable<FilmData[]> {
    return this.firestore
      .collection('users/' + localStorage.getItem('userId') + '/watchlist')
      .valueChanges()
      .pipe(
        throttleTime(5000),
        map((films: FilmData[]) =>
          films.sort((a, b) => (b.timeAdded || 0) - (a.timeAdded || 0))
        )
      );
  }

  fetchIgnore(): Observable<FilmData[]> {
    return this.firestore
      .collection('users/' + localStorage.getItem('userId') + '/ignore')
      .valueChanges()
      .pipe(throttleTime(5000));
  }

  getProfileMoviesLists(): Observable<FilmData[]> {
    return combineLatest([
      this.fetchWatchlist(),
      this.fetchSeenMovies(),
      this.fetchIgnore(),
    ])
      .pipe(
        takeUntil(this.cancelSub$),
        map(([watchlist, seen, ignore]) => {
          return [...watchlist, ...seen, ...ignore]
        })
      )
  }

  onLogin(): void {
    this.getProfileMoviesLists();
  }
}
