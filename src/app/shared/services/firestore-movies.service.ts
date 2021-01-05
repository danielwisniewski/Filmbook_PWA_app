import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Subscription } from 'rxjs';
import { filter, first, map, take, tap, throttleTime } from 'rxjs/operators';

import { FilmData } from '../Models/film-data.model';
import {
  checkOnProfileLists,
  convertMovieDetail,
  convertSnaps,
} from './db.utils';

@Injectable({
  providedIn: 'root',
})
export class FirestoreMoviesService {
  seenMovies = new BehaviorSubject<FilmData[]>(null);
  watchlist = new BehaviorSubject<FilmData[]>(null);
  recommended = new BehaviorSubject<FilmData[]>(null);
  ignore = new BehaviorSubject<FilmData[]>(null);
  private topMovies = new BehaviorSubject<FilmData[]>(null);
  private topSerials = new BehaviorSubject<FilmData[]>(null);
  private subs: Subscription[] = [];
  constructor(private firestore: AngularFirestore) {}

  fetchMovieDetailData(id: string) {
    return this.firestore
      .doc('/movies/' + id)
      .snapshotChanges()
      .pipe(
        first( val => val.payload.data() !== undefined ),
        map((snap) => <FilmData>snap.payload.data()),
        map((snap) => convertMovieDetail(snap, this.watchlist, this.seenMovies))
      );
  }

  fetchFilmsByGenreFirebase(type: string) {
    return this.firestore
      .collection('movies', (ref) =>
        ref
          .where('genre', 'array-contains', type)
          .orderBy('rating', 'desc')
          .limit(50)
      )
      .snapshotChanges()
      .pipe(
        take(1),
        map((snaps) => convertSnaps(snaps)),
        map((snaps) =>
          checkOnProfileLists(
            snaps,
            this.watchlist,
            this.seenMovies,
            this.ignore
          )
        )
      );
  }

  fetchTop() {
    this.firestore
      .collection('movies', (ref) =>
        ref.where('type', '==', 'film').orderBy('rating', 'desc').limit(100)
      )
      .snapshotChanges()
      .pipe(
        map((snaps) => convertSnaps(snaps)),
        map((snaps) =>
          checkOnProfileLists(
            snaps,
            this.watchlist,
            this.seenMovies,
            this.ignore
          )
        ),
        throttleTime(5000)
      )
      .subscribe((val) => {
        this.topMovies.next(val);
      });

    this.firestore
      .collection('movies', (ref) =>
        ref.where('type', '==', 'serial').orderBy('rating', 'desc').limit(100)
      )
      .snapshotChanges()
      .pipe(
        map((snaps) => convertSnaps(snaps)),
        map((snaps) =>
          checkOnProfileLists(
            snaps,
            this.watchlist,
            this.seenMovies,
            this.ignore
          )
        ),
        throttleTime(5000)
      )
      .subscribe((val) => {
        this.topSerials.next(val);
      });
  }

  getTop(): FilmData[] {
    return this.topMovies.value.concat(this.topSerials.value);
  }

  fetchRecomended() {
    this.subs.push(
      this.firestore
        .collection('recommended', (ref) => ref.orderBy('rating', 'desc'))
        .snapshotChanges()
        .pipe(
          map((snaps) => convertSnaps(snaps)),
          map((snaps) =>
            checkOnProfileLists(
              snaps,
              this.watchlist,
              this.seenMovies,
              this.ignore
            )
          ),
          throttleTime(5000)
        )
        .subscribe((val: FilmData[]) => {
          this.recommended.next(val);
        })
    );
  }

  private fetchSeenMovies() {
    this.subs.push(
      this.firestore
        .collection(
          'users/' + localStorage.getItem('userId') + '/seen',
          (ref) => ref.orderBy('myRating', 'desc')
        )
        .snapshotChanges()
        .pipe(map((snaps) => convertSnaps(snaps)), throttleTime(1000))
        .subscribe((val: FilmData[]) => {
          this.seenMovies.next(val);
        })
    );
  }

  private fetchWatchlist() {
    this.subs.push(
      this.firestore
        .collection(
          'users/' + localStorage.getItem('userId') + '/watchlist',
          (ref) => ref.orderBy('rating', 'desc')
        )
        .snapshotChanges()
        .pipe(map((snaps) => convertSnaps(snaps)), throttleTime(1000))
        .subscribe((val: FilmData[]) => {
          this.watchlist.next(val);
        })
    );
  }

  private fetchIgnore() {
    this.subs.push(
      this.firestore
        .collection('users/' + localStorage.getItem('userId') + '/ignore')
        .snapshotChanges()
        .pipe(map((snaps) => convertSnaps(snaps)), throttleTime(5000))
        .subscribe((val: FilmData[]) => {
          this.ignore.next(val);
        })
    );
  }

  initialFetch() {
    this.fetchWatchlist();
    this.fetchSeenMovies();
    this.fetchIgnore();
    this.fetchRecomended();
    this.fetchTop();
  }

  cancelSubscriptions() {
    this.subs.forEach((sub) => sub.unsubscribe());
    this.seenMovies.next(null);
    this.watchlist.next(null);
  }
}
