import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { FilmData } from 'src/app/core/models/film-data.model';
import { MovieMiniatureListService } from 'src/app/shared/components/movie-miniatures-list/movie-miniature-list.service';
import { EveningTvSeancesModel } from './models/evening-tv-seances.model';
import { TopTvSeancesModel } from './models/top-tv-seances.model';
import { RecommenedMoviesService } from './services/recommened-movies.service';
import { TopMoviesService } from './services/top-movies.service';
import { TvSeancesService } from './services/tv-seances.service';

@Injectable({
  providedIn: 'root',
})
export class MainMoviesPageFacadeService {
  private _recommenedMoviesService: RecommenedMoviesService;
  public get recommenedMoviesService(): RecommenedMoviesService {
    if (!this._recommenedMoviesService) {
      this._recommenedMoviesService = this.injector.get(
        RecommenedMoviesService
      );
    }
    return this._recommenedMoviesService;
  }

  private _tvSeancesService: TvSeancesService;
  public get tvSeancesService(): TvSeancesService {
    if (!this._tvSeancesService) {
      this._tvSeancesService = this.injector.get(TvSeancesService);
    }
    return this._tvSeancesService;
  }

  private _topMoviesService: TopMoviesService;
  public get topMoviesService(): TopMoviesService {
    if (!this._topMoviesService) {
      this._topMoviesService = this.injector.get(TopMoviesService);
    }
    return this._topMoviesService;
  }

  constructor(
    private injector: Injector,
    private MiniatureList: MovieMiniatureListService
  ) {}

  getRecommenedMovies(): Observable<FilmData[]> {
    return this.recommenedMoviesService.fetchRecommendedMovies();
  }

  getTopTvSeances(): Observable<TopTvSeancesModel[]> {
    return this.tvSeancesService.fetchTopTvSeances();
  }

  getEveningTvSeances(): Observable<EveningTvSeancesModel[]> {
    return this.tvSeancesService.fetchEveningTvSeances();
  }

  getTopRated(): Observable<FilmData[]> {
    return this.topMoviesService.topRated$.asObservable();
  }

  changeCurrentList(list: FilmData[]): void {
    if ( list ) this.MiniatureList.currentList$.next(list);
  }

  closeMiniaturesSub() {
    this.MiniatureList.currentList$.next(null);
  }
}
