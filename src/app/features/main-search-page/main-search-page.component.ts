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
  lastSearchResults$: Observable<SearchResultModel[]>;
  constructor(private facadeService: MainSearchPageFacadeService) {
  }

  ngOnInit(): void {
    this.lastSearchResults$ = this.facadeService.getLastSearchResults();
  }

  onKeydown(form: NgForm) {
    this.facadeService.searchMovieByTitle(form.value.serachMovie);
    form.reset();
  }

  ngOnDestroy() : void {
    this.facadeService.clearSearchResult();
  }

}
