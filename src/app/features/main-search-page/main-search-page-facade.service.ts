import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { MovieMiniatureListService } from 'src/app/shared/components/movie-miniatures-list/movie-miniature-list.service';
import { SearchResultModel } from './models/search-result.model';
import { LastResultsHandlerService } from './services/last-results-handler.service';
import { SearchMovieApiService } from './services/search-movie-api.service';

@Injectable({
  providedIn: 'root',
})
export class MainSearchPageFacadeService {
  private _searchMovieApiService: SearchMovieApiService;
  public get searchMovieApiService(): SearchMovieApiService {
    if (!this._searchMovieApiService) {
      this._searchMovieApiService = this.injector.get(SearchMovieApiService);
    }
    return this._searchMovieApiService;
  }

  private _lastResultHandlerService: LastResultsHandlerService;
  public get lastResultHandlerService(): LastResultsHandlerService {
    if (!this._lastResultHandlerService) {
      this._lastResultHandlerService = this.injector.get(
        LastResultsHandlerService
      );
    }
    return this._lastResultHandlerService;
  }

  constructor(
    private injector: Injector,
    private http: HttpClient,
    private miniatureList: MovieMiniatureListService
  ) {
    this.updateLastSearchResults();
  }

  searchMovieByTitle(title: string): void {
    this.searchMovieApiService.searchMovieByTitle(title);
  }

  getLastSearchResults(): Observable<SearchResultModel[]> {
    return this.lastResultHandlerService.lastSearchResults$;
  }

  getLoadingStatus(): void {
    this.searchMovieApiService.isLoading$
      .asObservable()
      .subscribe((value) => this.miniatureList.isLoading$.next(value));
  }

  clearSearchResult(): void {
    this.searchMovieApiService.searchResult.next(null);
  }

  private updateLastSearchResults(): void {
    this.searchMovieApiService.searchResult.subscribe(
      (searchResult: SearchResultModel[]) => {
        this.changeCurrentList(searchResult)
        this.lastResultHandlerService.updateLastSearchResult(searchResult);
      }
    );
  }

  serachIdByTitle(title: string) {
    const BASE_URL =
      'https://homeautodaniel.eu-gb.mybluemix.net/filmweb-search-film';
    return this.http
      .get<any>(BASE_URL, {
        params: new HttpParams().set('q', title),
      })
      .pipe(
        map((val) => {
          return (val[0].link = val[0].link.replace('/', '_'));
        })
      );
  }

  private changeCurrentList(list: SearchResultModel[]): void {
    if (list) this.miniatureList.currentList$.next(list);
  }
}
