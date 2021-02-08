import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, of } from 'rxjs';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { FilmData } from 'src/app/core/models/film-data.model';

@Injectable({
  providedIn: 'root',
})
export class FetchMoviesByGenreService {
  genre = new BehaviorSubject<string>('');
  constructor(private firestore: AngularFirestore) {}

  fetchMoviesByGenre(): Observable<FilmData[]> {
    return this.genre.asObservable().pipe(
      switchMap((id) => {
        return this.firestore
          .collection('movies', (ref) =>
            ref
              .where('genre', 'array-contains', id)
              .orderBy('rating', 'desc')
              .limit(50)
          )
          .valueChanges()
          .pipe(take(1));
      })
    );
  }
}
