import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SearchResultModel } from '../models/search-result.model';

@Injectable({
  providedIn: 'root',
})
export class LastResultsHandlerService {
  lastSearchResults$ = new BehaviorSubject<SearchResultModel[]>(null);
  private _lastSearchResult: SearchResultModel[];
  constructor() {}

  updateLastSearchResult(searchResult: SearchResultModel[]): void {
    if ( searchResult ) {

      if ( this._lastSearchResult ) {
        this._lastSearchResult = [...searchResult, ...this._lastSearchResult]
      } else {
        this._lastSearchResult = searchResult;
      }

      if (this._lastSearchResult && this._lastSearchResult.length > 5) {
        this._lastSearchResult = this._lastSearchResult.slice(0, 5);
      }
      this.lastSearchResults$.next(this._lastSearchResult);
    }
  }
}
