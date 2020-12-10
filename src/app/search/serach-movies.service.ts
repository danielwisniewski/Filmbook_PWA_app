import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { first, map, take } from 'rxjs/operators';
import { FilmData } from '../shared/Models/film-data.model';

@Injectable({
  providedIn: 'root',
})
export class SerachMoviesService {
  lastSearchResult = new BehaviorSubject<FilmData[]>(null);
  constructor(private http: HttpClient, private db: AngularFirestore) {}

  searchByTitle(title: string) {
    const BASE_URL =
      'https://homeautodaniel.eu-gb.mybluemix.net/filmweb-search';
    return this.http
      .get<FilmData[]>(BASE_URL, {
        params: new HttpParams().set('q', title),
      })
      .pipe(
        map((films) => {
          return films.map((film: FilmData) => {
            film.id = film.link.replace('/', '_');
            return film;
          });
        })
      );
  }

  fetchSearchResult() {
    this.db
      .collection(
        'users/' + localStorage.getItem('userId') + '/lastSearchResult'
      )
      .snapshotChanges()
      .pipe(
        take(1),
        map((snaps) => {
          return snaps.map((snap) => {
            return <FilmData>snap.payload.doc.data();
          });
        })
      )
      .subscribe((val: FilmData[]) => {
        this.lastSearchResult.next(val);
      });
  }

  setLastSearchResult(result: FilmData[]) {
    this.lastSearchResult.next(result);
    const batchDelete = this.db.firestore.batch();
    const batchSet = this.db.firestore.batch();
    let lastResult = this.db
      .collection(
        'users/' + localStorage.getItem('userId') + '/lastSearchResult'
      )
      .ref.get();

    lastResult
      .then((docs) => docs.forEach((doc) => batchDelete.delete(doc.ref)))
      .then(() => batchDelete.commit())
      .then(() => {
        result.forEach((film: FilmData, index) => {
          const firebaseRef = this.db.doc(
            'users/' +
              localStorage.getItem('userId') +
              '/lastSearchResult/' +
              index
          ).ref;
          batchSet.set(firebaseRef, film);
        });
        batchSet.commit();
      });
  }
}
