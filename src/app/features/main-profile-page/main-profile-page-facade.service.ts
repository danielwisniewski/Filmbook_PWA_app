import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/features/login-page/login-page.service';
import { FilmData } from 'src/app/core/models/film-data.model';

import { FetchUserMoviesListsService } from './services/fetch-user-movies-lists.service';

@Injectable({
  providedIn: 'root',
})
export class MainProfilePageFacadeService {
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
    this.onAuthChange()
  }

  getMoviesOnWatchList() : Observable<FilmData[]> {
    return this.fetchUserMoviesListsService.moviesOnWatchList$.asObservable();
  }

  getMoviesOnSeenList() : Observable<FilmData[]> {
    return this.fetchUserMoviesListsService.moviesOnSeenList$.asObservable();
  }

  getMoviesOnIgnoreList() : Observable<FilmData[]> {
    return this.fetchUserMoviesListsService.moviesOnIgnoreList$.asObservable();
  }

  getProfileMoviesLists() : { [key: string] : FilmData[] } {
    return {
      "watchList": this.fetchUserMoviesListsService.moviesOnWatchList$.value,
      "seenList": this.fetchUserMoviesListsService.moviesOnSeenList$.value,
      "ignoreList": this.fetchUserMoviesListsService.moviesOnIgnoreList$.value
    }
  }

  private onAuthChange() : void {
    this.authService.authChange.subscribe(
      ( authStatus : boolean ) => {
        if ( authStatus ) {
          this.fetchUserMoviesListsService.onLogin()
        }
        else {
          this.fetchUserMoviesListsService.onLogout();
        }
      }
    )
  }
}
