import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilmData } from 'src/app/core/models/film-data.model';
import { EveningTvSeancesModel } from '../models/evening-tv-seances.model';
import { TopTvSeancesModel } from '../models/top-tv-seances.model';

@Injectable({
  providedIn: 'root'
})
export class TvSeancesService {
  constructor(private firestore: AngularFirestore) {}

  fetchTopTvSeances(): Observable<TopTvSeancesModel[]> {
    return this.firestore
      .collection('television')
      .valueChanges()
      .pipe(
        map((films: FilmData[]) => {
          return films.map((film: FilmData) => {
            return <TopTvSeancesModel>{
              title: film.title,
              year: film.year,
              rating: film.rating,
              time: film.time,
              id: film.id,
              poster: film.poster,
              plot: film.plot.includes('Więcej mniej')
                ? film.plot.replace('Więcej mniej', '')
                : film.plot,
            };
          });
        })
      );
  }

  fetchEveningTvSeances(): Observable<EveningTvSeancesModel[]> {
    return this.firestore
      .collection('eveningSeances')
      .valueChanges()
  }
}
