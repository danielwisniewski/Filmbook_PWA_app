import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { throttleTime, map, takeUntil } from 'rxjs/operators';
import { FilmData } from 'src/app/core/models/film-data.model';

@Injectable({
  providedIn: 'root',
})
export class FetchUserMoviesListsService {
  profileList$ = new BehaviorSubject<FilmData[]>(null);
  cancelSub$ = new Subject<boolean>();
  constructor(private firestore: AngularFirestore) {}

  fetchSeenMovies(): Observable<FilmData[]> {
    return this.firestore
      .collection('users/' + localStorage.getItem('userId') + '/seen'
      )
      .valueChanges()
      .pipe(throttleTime(1000));
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
      .pipe(throttleTime(1000));
  }

  private getProfileMoviesLists(): void {
    combineLatest([
      this.fetchWatchlist(),
      this.fetchSeenMovies(),
      this.fetchIgnore(),
    ])
      .pipe(
        takeUntil(this.cancelSub$),
        map((val) => {
          this.profileList$.next(val[0].concat(val[1]).concat(val[2]));
        })
      )
      .subscribe();
  }

  onLogin(): void {
    this.getProfileMoviesLists();
  }
}
