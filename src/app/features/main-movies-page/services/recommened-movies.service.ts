import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { shareReplay, throttleTime } from 'rxjs/operators';
import { FilmData } from 'src/app/core/models/film-data.model';

@Injectable({
  providedIn: 'root',
})
export class RecommenedMoviesService {
  constructor(private firestore: AngularFirestore) {}

  fetchRecommendedMovies(): Observable<FilmData[]> {
    return this.firestore
      .collection('recommended', (ref) => ref.orderBy('rating', 'desc'))
      .valueChanges()
      .pipe(throttleTime(5000), shareReplay(1));
  }
}
