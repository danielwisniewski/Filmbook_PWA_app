import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { first, map, take} from 'rxjs/operators';

import { FilmData } from '../../core/models/film-data.model';
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
  ignore = new BehaviorSubject<FilmData[]>(null);
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

}
