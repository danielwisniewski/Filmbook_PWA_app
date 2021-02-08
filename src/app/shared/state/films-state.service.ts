import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilmData } from 'src/app/core/models/film-data.model';
import { RecommenedMoviesService } from 'src/app/features/main-movies-page/services/recommened-movies.service';
import { TopMoviesService } from 'src/app/features/main-movies-page/services/top-movies.service';
import { FetchUserMoviesListsService } from 'src/app/features/main-profile-page/services/fetch-user-movies-lists.service';
import { FetchMoviesByGenreService } from 'src/app/features/shared-movies-by-genre-page/MoviesByGenre/services/fetch-movies-by-genre.service';
import { FiltersService } from '../services/filters.service';

@Injectable({
  providedIn: 'root',
})
export class FilmsStateService {
  private _recMoviesList$: Observable<FilmData[]>;
  private _topMoviesList$: Observable<FilmData[]>;
  private _profileMoviesList$: Observable<FilmData[]>;
  private _genreMoviesList$ : Observable<FilmData[]>

  constructor(
    private recommendedMovies: RecommenedMoviesService,
    private topMovies: TopMoviesService,
    private profileMovies: FetchUserMoviesListsService,
    private filterService: FiltersService,
    private genreService: FetchMoviesByGenreService
  ) {
    this._recMoviesList$ = this.recommendedMovies.fetchRecommendedMovies();
    this._topMoviesList$ = this.topMovies.fetchTopRated();
    this._profileMoviesList$ = this.profileMovies.getProfileMoviesLists();
    this._genreMoviesList$ = this.genreService.fetchMoviesByGenre()
  }

  getRecommendedMovies(): Observable<FilmData[]> {
    const supplementedFilmData$: Observable<
      FilmData[]
    > = this._supplementFilmData(this._recMoviesList$);

    return this._filterMovieList(supplementedFilmData$);
  }

  getTopMovies(): Observable<FilmData[]> {
    const supplementedFilmData$: Observable<
      FilmData[]
    > = this._supplementFilmData(this._topMoviesList$);

    return this._filterMovieList(supplementedFilmData$);
  }

  getMoviesByGenre() : Observable<FilmData[]> {
    const supplementedFilmData$: Observable<
      FilmData[]
    > = this._supplementFilmData(this._genreMoviesList$);

    return this._filterMovieList(supplementedFilmData$);
  }

  private _filterMovieList(
    list$: Observable<FilmData[]>
  ): Observable<FilmData[]> {
    return combineLatest([
      list$,
      this.filterService.activeFilter.asObservable(),
    ]).pipe(
      map(([movieList, filters]) => {
        return movieList.filter((movie: FilmData) => {
          if (movie.ignore) return false;
          if (filters.isOnSeen && movie.seen) return false;
          if (filters.isOnWatchlist && movie.watchlist) return false;
          if (filters.type && movie.type !== filters.type) return false;
          if (filters.minRating > 1 && movie.rating <= filters.minRating)
            return false;
          return true;
        });
      })
    );
  }

  private _supplementFilmData(
    movieList: Observable<FilmData[]>
  ): Observable<FilmData[]> {
    return combineLatest([movieList, this._profileMoviesList$]).pipe(
      map(([movieList, profileList]) => {
        return movieList.map((movie: FilmData) => {
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
        });
      })
    );
  }
}
