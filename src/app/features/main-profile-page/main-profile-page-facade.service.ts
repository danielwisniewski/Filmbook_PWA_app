import { Injectable, Injector } from '@angular/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/features/login-page/login-page.service';
import { FilmData } from 'src/app/core/models/film-data.model';
import { FetchUserMoviesListsService } from './services/fetch-user-movies-lists.service';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MainProfilePageFacadeService {
  subs: Subscription[] = [];
  titleToFind$ = new BehaviorSubject<string>('');
  sortedByTime$ = new BehaviorSubject<boolean>(null);
  private _fetchUserMoviesListsService: FetchUserMoviesListsService;

  public get fetchUserMoviesListsService(): FetchUserMoviesListsService {
    if (!this._fetchUserMoviesListsService) {
      this._fetchUserMoviesListsService = this.injector.get(
        FetchUserMoviesListsService
      );
    }
    return this._fetchUserMoviesListsService;
  }

  constructor(private injector: Injector, private authService: AuthService) {
    this.onAuthChange();
  }

  getMoviesOnWatchList(): Observable<FilmData[]> {
    return this.fetchUserMoviesListsService.fetchWatchlist();
  }

  private _getMoviesOnSeenList(): Observable<FilmData[]> {
    return this.fetchUserMoviesListsService.fetchSeenMovies();
  }

  getMoviesOnIgnoreList(): Observable<FilmData[]> {
    return this.fetchUserMoviesListsService.fetchIgnore();
  }

  getMoviesOnSeenList(): Observable<FilmData[]> {
    return combineLatest([
      this._getMoviesOnSeenList(),
      this.titleToFind$.asObservable(),
      this.sortedByTime$.asObservable(),
    ]).pipe(
      map(([seenMovies, titleToFind, sortedByTime]) => {
        return seenMovies
          .filter((movie) =>
            movie.title.toLowerCase().includes(titleToFind.toLowerCase())
          )
          .sort((a, b) => {
            if (sortedByTime) return (b.timeSeen || 0) - (a.timeSeen || 0);
            else return b.myRating - a.myRating;
          });
      })
    );
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
}
