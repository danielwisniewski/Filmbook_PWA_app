import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { FilmData } from 'src/app/core/models/film-data.model';

@Injectable({
  providedIn: 'root',
})
export class FetchMoviesByGenreService {
  constructor(private firestore: AngularFirestore) {}

  fetchMoviesByGenre(genre: string) : Observable<FilmData[]> {
    return this.firestore
      .collection('movies', (ref) =>
        ref
          .where('genre', 'array-contains', genre)
          .orderBy('rating', 'desc')
          .limit(50)
      )
      .valueChanges()
      .pipe(take(1));
  }
}
