import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilmData } from 'src/app/shared/Models/film-data.model';
import { convertSnaps } from 'src/app/shared/services/db.utils';

@Injectable()
export class MoviesInTvService {
  filmsInTv = new BehaviorSubject<FilmData[]>(null);
  filmsInEvening = new BehaviorSubject<FilmData[]>(null);
  constructor(private firestore: AngularFirestore) {}

  fetchFilmsInTv() {
    this.firestore
      .collection('television')
      .snapshotChanges()
      .pipe(map((snaps) => convertSnaps(snaps)))
      .subscribe((val) => {
        this.filmsInTv.next(val);
      });
  }

  fetchFilmsInEvening() {
    this.firestore
      .collection('eveningSeances')
      .snapshotChanges()
      .pipe(map((snaps) => convertSnaps(snaps)))
      .subscribe((val) => {
        this.filmsInEvening.next(val);
      });
  }
}
