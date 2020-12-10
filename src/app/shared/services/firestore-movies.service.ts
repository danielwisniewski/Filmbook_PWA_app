import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, from, Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { FilmData } from '../Models/film-data.model';
import {
  checkOnProfileLists,
  convertMovieDetail,
  convertSnaps,
} from './db.utils';
import { FiltersService } from './filters.service';

@Injectable({
  providedIn: 'root',
})
export class FirestoreMoviesService {
  seenMovies = new BehaviorSubject<FilmData[]>(null);
  watchlist = new BehaviorSubject<FilmData[]>(null);
  recommended = new BehaviorSubject<FilmData[]>(null);
  topMovies = new BehaviorSubject<FilmData[]>(null);
  topSerials = new BehaviorSubject<FilmData[]>(null);
  subs: Subscription[] = [];
  constructor(
    private firestore: AngularFirestore,
    private filterService: FiltersService
  ) {}

  fetchMovieDetailData(id: string) {
    if (!this.seenMovies.value) this.fetchSeenMovies();
    if (!this.watchlist.value) this.fetchWatchlist();

    return this.firestore
      .doc('/movies/' + id)
      .snapshotChanges()
      .pipe(
        take(1),
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
          checkOnProfileLists(snaps, this.watchlist, this.seenMovies)
        )
      );
  }

  fetchTop(type: string) {
    this.firestore
      .collection('movies', (ref) =>
        ref.where('type', '==', type).orderBy('rating', 'desc').limit(100)
      )
      .snapshotChanges()
      .pipe(
        take(1),
        map((snaps) => convertSnaps(snaps)),
        map((snaps) =>
          checkOnProfileLists(snaps, this.watchlist, this.seenMovies)
        )
      )
      .subscribe((val) => {
        if (type === 'serial') this.topSerials.next(val);
        else this.topMovies.next(val);
      });
  }

  fetchRecomended() {
    this.filterService.fetchFilters();
    if (!this.seenMovies.value) this.fetchSeenMovies();
    if (!this.watchlist.value) this.fetchWatchlist();
    this.subs.push(
      this.firestore
        .collection('recommended', (ref) => ref.orderBy('rating', 'desc'))
        .snapshotChanges()
        .pipe(
          map((snaps) => convertSnaps(snaps)),
          map((snaps) =>
            checkOnProfileLists(snaps, this.watchlist, this.seenMovies)
          )
        )
        .subscribe((val: FilmData[]) => {
          this.recommended.next(val);
        })
    );
  }

  addToMyProfile(film: FilmData, collection: string) {
    const addInfo =
      collection === 'seen'
        ? { seen: true, watchlist: false }
        : { seen: false, watchlist: true };
    return from(
      this.firestore
        .doc(
          'users/' +
            localStorage.getItem('userId') +
            '/' +
            collection +
            '/' +
            film.id
        )
        .set({ ...film, ...addInfo })
    );
  }

  deleteFromMyProfile(id: string, collection: string) {
    this.firestore
      .doc(
        'users/' + localStorage.getItem('userId') + '/' + collection + '/' + id
      )
      .delete();
  }

  fetchSeenMovies() {
    this.filterService.fetchFilters();
    this.subs.push(
      this.firestore
        .collection(
          'users/' + localStorage.getItem('userId') + '/seen',
          (ref) => ref.orderBy('myRating', 'desc')
        )
        .snapshotChanges()
        .pipe(map((snaps) => convertSnaps(snaps)))
        .subscribe((val: FilmData[]) => {
          this.seenMovies.next(val);
        })
    );
  }

  fetchWatchlist() {
    this.filterService.fetchFilters();
    this.subs.push(
      this.firestore
        .collection(
          'users/' + localStorage.getItem('userId') + '/watchlist',
          (ref) => ref.orderBy('rating', 'desc')
        )
        .snapshotChanges()
        .pipe(map((snaps) => convertSnaps(snaps)))
        .subscribe((val: any) => {
          this.watchlist.next(val);
        })
    );
  }

  cancelSubscriptions() {
    this.subs.forEach((sub) => sub.unsubscribe());
    this.seenMovies.next(null);
    this.watchlist.next(null)
    this.filterService.cancelSubscriptions();
  }
}
