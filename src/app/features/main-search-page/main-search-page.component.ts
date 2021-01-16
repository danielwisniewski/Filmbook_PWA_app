import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { MainSearchPageFacadeService } from './main-search-page-facade.service';
import { SearchResultModel } from './models/search-result.model';

@Component({
  selector: 'app-search',
  templateUrl: './main-search-page.component.html',
  styleUrls: ['./main-search-page.component.css'],
  
})
export class MainSearchPageComponent implements OnInit, OnDestroy {
  searchResult$: Observable<SearchResultModel[]>;
  lastSearchResults$: Observable<SearchResultModel[]>;
  isLoading$ : Observable<boolean> ;
  constructor(private facadeService: MainSearchPageFacadeService) {
  }

  ngOnInit(): void {
    this.searchResult$ = this.facadeService.getSearchResult();
    this.lastSearchResults$ = this.facadeService.getLastSearchResults();
    this.isLoading$ = this.facadeService.getLoadingStatus();
  }

  onKeydown(form: NgForm) {
    this.facadeService.searchMovieByTitle(form.value.serachMovie);
    form.reset();
  }

  ngOnDestroy() : void {
    this.facadeService.clearSearchResult();
  }

}
