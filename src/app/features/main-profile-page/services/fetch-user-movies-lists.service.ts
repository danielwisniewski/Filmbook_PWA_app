import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Subscription } from 'rxjs';
import { throttleTime, tap } from 'rxjs/operators';
import { FilmData } from 'src/app/core/models/film-data.model';

@Injectable({
  providedIn: 'root'
})
export class FetchUserMoviesListsService {
  moviesOnSeenList$ = new BehaviorSubject<FilmData[]>(null);
  moviesOnWatchList$ = new BehaviorSubject<FilmData[]>(null);
  moviesOnIgnoreList$ = new BehaviorSubject<FilmData[]>(null);
  private subs: Subscription[] = [];
  constructor(private firestore: AngularFirestore) { }

  private fetchSeenMovies(): void {
    this.subs.push(
      this.firestore
        .collection(
          'users/' + localStorage.getItem('userId') + '/seen',
          (ref) => ref.orderBy('myRating', 'desc')
        )
        .valueChanges()
        .pipe(
          throttleTime(1000),
          tap((filmsData: FilmData[]) => this.moviesOnSeenList$.next(filmsData))
        )
        .subscribe()
    );
  }

  private fetchWatchlist(): void {
    this.subs.push(
      this.firestore
        .collection(
          'users/' + localStorage.getItem('userId') + '/watchlist',
          (ref) => ref.orderBy('rating', 'desc')
        )
        .valueChanges()
        .pipe(
          throttleTime(1000),
          tap((filmsData: FilmData[]) => this.moviesOnWatchList$.next(filmsData))
        )
        .subscribe()
    );
  }

  private fetchIgnore(): void {
    this.subs.push(
      this.firestore
        .collection('users/' + localStorage.getItem('userId') + '/ignore')
        .valueChanges()
        .pipe(
          throttleTime(1000),
          tap((filmsData: FilmData[]) => this.moviesOnIgnoreList$.next(filmsData))
        )
        .subscribe()
    );
  }

  onLogout(): void {
    this.subs.forEach( sub => {
      if ( sub ) sub.unsubscribe()
    } )
  }

  onLogin() : void {
    this.fetchWatchlist();
    this.fetchSeenMovies();
    this.fetchIgnore();
  }

}
