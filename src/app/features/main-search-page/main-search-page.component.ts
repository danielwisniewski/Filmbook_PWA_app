import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { FilterModel } from 'src/app/shared/models/filter.model';
import { FiltersService } from 'src/app/shared/services/filters.service';
import { MainSearchPageFacadeService } from './main-search-page-facade.service';
import { SearchResultModel } from './models/search-result.model';

@Component({
  selector: 'app-search',
  templateUrl: './main-search-page.component.html',
  styleUrls: ['./main-search-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainSearchPageComponent implements OnDestroy {
  lastSearchResults$: Observable<
    SearchResultModel[]
  > = this.facadeService.getLastSearchResults();
  searchResult$: Observable<
    SearchResultModel[]
  > = this.facadeService.getSearchResult();

  constructor(
    private facadeService: MainSearchPageFacadeService,
    private filterService: FiltersService
  ) {
    this.filterService.activeFilter.next(new FilterModel());
    this.filterService.activeMoviesElementsSize.next('col-6');
  }

  onKeydown(form: NgForm) {
    this.facadeService.searchMovieByTitle(form.value.serachMovie);
    form.reset();
  }

  ngOnDestroy(): void {
    this.facadeService.clearSearchResult();
  }
}
