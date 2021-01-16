import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { FilmData } from '../../core/models/film-data.model';
import { UIService } from '../../shared/services/ui.service';
import { AwardsModel } from './models/awards.model';
import { TelevisionSeancesModel } from './models/televisionSeances.model';

@Injectable({
  providedIn: 'root',
})
export class MovieDetailService {
  filmData: FilmData;
  lastFilmData: {[key: string] : FilmData} = {};
  constructor(
    private firestore: AngularFirestore,
    private ui: UIService,
    private http: HttpClient
  ) {}

  fetchMovieDetailData(id: string) : Observable<FilmData> {
    return this.firestore
      .doc('/movies/' + id)
      .valueChanges()
      .pipe(
        first( (val : FilmData) => val !== undefined ),
      );
  }

  getLastFilmsData(id:string): FilmData {
    return this.lastFilmData[id];
  }

  setLastFilmData(filmData: FilmData) {
    this.lastFilmData[filmData.id] = filmData;
  }

  updateMovieOnProfile(film: FilmData, collection: string) {
    
    if (!film[collection]) {
      this.firestore
        .doc(
          'users/' +
            localStorage.getItem('userId') +
            '/' +
            collection +
            '/' +
            film.id
        )
        .delete()
        .then(() => {
          this.ui.showTopSnackbar('Usunięto z listy');
        });
    } else {
      if ( collection === 'watchlist' ) {
        film.timeAdded = Date.now();
      } else {
        film.timeSeen = Date.now()
      }
      this.firestore
        .doc(
          'users/' +
            localStorage.getItem('userId') +
            '/' +
            collection +
            '/' +
            film.id
        )
        .set(film)
        .then(() => {
          this.ui.showTopSnackbar('Dodano do listy');
        });
    }
  }

  getAwards(url: string) {
    url = url.replace('_', '/');
    const FILM_URL = 'https://www.filmweb.pl/' + url + '/awards';
    const BASE_URL = 'https://homeautodaniel.eu-gb.mybluemix.net/getAwards';
    this.ui.loading.next(true);
    return this.http.get<AwardsModel[]>(BASE_URL, {
      params: new HttpParams().set('q', FILM_URL),
    });
  }

  getFullCast(url: string) {
    url = url.replace('_', '/');
    const FILM_URL = 'https://www.filmweb.pl/' + url + '/cast/actors';
    const BASE_URL = 'https://homeautodaniel.eu-gb.mybluemix.net/getCast';
    this.ui.loading.next(true);
    return this.http.get<any>(BASE_URL, {
      params: new HttpParams().set('q', FILM_URL),
    });
  }

  checkInTv(url: string) {
    const BASE_URL = 'https://homeautodaniel.eu-gb.mybluemix.net/checkInTv';
    const FILM_URL = url + '/tv';
    return this.http.get<TelevisionSeancesModel[]>(BASE_URL, {
      params: new HttpParams().set('q', FILM_URL),
    });
  }

  checkInServices(title: string) {
    const BASE_URL = 'https://homeautodaniel.eu-gb.mybluemix.net/getServices';
    return this.http.get<any>(BASE_URL, {
      params: new HttpParams().set('q', title),
    });
  }

  private addSimilarMoviesToDb(id: string, movies: FilmData[]) {
    this.firestore.doc('movies/' + id).update({ similar: movies });
    const filmData = { similar: movies, ...this.getLastFilmsData(id) }
    this.setLastFilmData(filmData);
  }

  findSimilarMovies(title: string, id: string) {
    const BASE_URL =
      'https://homeautodaniel.eu-gb.mybluemix.net/getSimilarMovies';
    this.ui.loading.next(true);
    return this.http
      .get<any>(BASE_URL, {
        params: new HttpParams().set('q', title),
      })
      .subscribe((val) => this.addSimilarMoviesToDb(id, val));
  }
}
