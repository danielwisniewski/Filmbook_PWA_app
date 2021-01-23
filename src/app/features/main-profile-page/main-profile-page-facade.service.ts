import { Injectable, Injector } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/features/login-page/login-page.service';
import { FilmData } from 'src/app/core/models/film-data.model';
import { FetchUserMoviesListsService } from './services/fetch-user-movies-lists.service';
import { MovieMiniatureListService } from 'src/app/shared/components/movie-miniatures-list/movie-miniature-list.service';

@Injectable({
  providedIn: 'root',
})
export class MainProfilePageFacadeService {
  subs: Subscription[] = [];
  private _fetchUserMoviesListsService: FetchUserMoviesListsService;

  public get fetchUserMoviesListsService(): FetchUserMoviesListsService {
    if (!this._fetchUserMoviesListsService) {
      this._fetchUserMoviesListsService = this.injector.get(
        FetchUserMoviesListsService
      );
    }
    return this._fetchUserMoviesListsService;
  }

  constructor(
    private injector: Injector,
    private authService: AuthService,
    private movieMiniatures: MovieMiniatureListService
  ) {
    this.onAuthChange();
  }

  getMoviesOnWatchList(): Observable<FilmData[]> {
    return this.fetchUserMoviesListsService.fetchWatchlist();
  }

  getMoviesOnSeenList(): Observable<FilmData[]> {
    return this.fetchUserMoviesListsService.fetchSeenMovies();
  }

  getMoviesOnIgnoreList(): Observable<FilmData[]> {
    return this.fetchUserMoviesListsService.fetchIgnore();
  }

  private onAuthChange(): void {
    this.authService.authChange.subscribe((authStatus: boolean) => {
      if (authStatus) {
        this.fetchUserMoviesListsService.onLogin();
        this.subs.push(this.getMoviesOnWatchList().subscribe());
        this.subs.push(this.getMoviesOnSeenList().subscribe());
        this.subs.push(this.getMoviesOnIgnoreList().subscribe());
      } else {
        this.fetchUserMoviesListsService.cancelSub$.next(true);
        if (this.subs.length > 0) {
          this.subs.forEach((sub) => sub.unsubscribe());
        }
        this.subs = [];
      }
    });
  }

  changeCurrentList(list: FilmData[]): void {
    if (list) this.movieMiniatures.currentList$.next(list);
  }

  closeMiniaturesSub() {
    this.movieMiniatures.currentList$.next(null);
    this.movieMiniatures.closeSub$.next(true);
  }
}
