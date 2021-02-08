import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { first, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { FilmData } from '../../core/models/film-data.model';
import { UIService } from '../../shared/services/ui.service';
import { FetchUserMoviesListsService } from '../main-profile-page/services/fetch-user-movies-lists.service';
import { AwardsModel } from './models/awards.model';
import { TelevisionSeancesModel } from './models/televisionSeances.model';

@Injectable({
  providedIn: 'root',
})
export class MovieDetailService {
  filmData: FilmData;
  private lastFilmData = new BehaviorSubject<FilmData>(null);
    
  constructor(
    private firestore: AngularFirestore,
    private ui: UIService,
    private http: HttpClient,
    private profileLists: FetchUserMoviesListsService
  ) {}

  fetchMovieDetailData(reqId: string): Observable<FilmData> {
    return of(reqId).pipe(
      switchMap((id) => {
        return this.firestore
          .doc('/movies/' + id)
          .valueChanges()
          .pipe(
            first((val: FilmData) => val !== undefined),
            withLatestFrom(this.profileLists.getProfileMoviesLists()),
            map(([movie, profileList]) => {
              return {
                ...movie,
                watchlist:
                  profileList.find((profileFilm) => movie.id === profileFilm.id)
                    ?.watchlist || false,
                timeAdded:
                  profileList.find((profileFilm) => movie.id === profileFilm.id)
                    ?.timeAdded || null,
                seen:
                  profileList.find((profileFilm) => movie.id === profileFilm.id)
                    ?.seen || false,
                timeSeen:
                  profileList.find((profileFilm) => movie.id === profileFilm.id)
                    ?.timeSeen || null,
                myRating:
                  profileList.find((profileFilm) => movie.id === profileFilm.id)
                    ?.myRating || null,
                ignore:
                  profileList.find((profileFilm) => movie.id === profileFilm.id)
                    ?.ignore || false,
              } as FilmData;
            })
          );
      })
    )
  }

  getLastFilmsData(): Observable<FilmData> {
    return this.lastFilmData.asObservable()
  }

  setLastFilmData(filmData: FilmData) {
    this.lastFilmData.next(filmData)
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
      if (collection === 'watchlist') {
        film.timeAdded = Date.now();
      } else {
        film.timeSeen = Date.now();
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
    console.log(title)
    const BASE_URL = 'https://homeautodaniel.eu-gb.mybluemix.net/getServices';
    return this.http.get<any>(BASE_URL, {
      params: new HttpParams().set('q', title),
    });
  }

  private addSimilarMoviesToDb(id: string, movies: FilmData[]) {
    this.firestore.doc('movies/' + id).update({ similar: movies });
    const filmData = { similar: movies, ...this.lastFilmData.value };
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
      .subscribe((val) => {
        this.addSimilarMoviesToDb(id, val);
      });
  }
}
