import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { FilmData } from '../shared/Models/film-data.model';

@Injectable({
  providedIn: 'root',
})
export class MoviesServiceService {
  filmsInTv = new BehaviorSubject<FilmData[]>(null);
  constructor(private firestore: AngularFirestore) {}

  fetchFilmsInTv() {
    this.firestore
      .collection('television')
      .snapshotChanges()
      .pipe(
        take(1),
        map((snaps) => {
          return snaps.map(snap => {
            return <FilmData>snap.payload.doc.data()
          })
        })
      )
      .subscribe((val) => {
        this.filmsInTv.next(val);
      });
  }
}
