import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TopTvSeancesModel } from 'src/app/features/main-movies-page/models/top-tv-seances.model';
import { MainSearchPageFacadeService } from 'src/app/features/main-search-page/main-search-page-facade.service';
import { FilmData } from '../../../core/models/film-data.model';
import { FilterModel } from '../../models/filter.model';
import { FiltersService } from '../../services/filters.service';
import { UIService } from '../../services/ui.service';

@Component({
  selector: 'app-movie-miniatures-list',
  templateUrl: './movie-miniatures-list.component.html',
  styleUrls: ['./movie-miniatures-list.component.css'],
})
export class MovieMiniaturesListComponent implements OnInit, OnDestroy {
  @Input() filmData: FilmData[] | TopTvSeancesModel[] ;
  size: string;
  filter: FilterModel;
  subs: Subscription[] = [];
  noImageUrl = '../../../assets/images/No-image-available.png';
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  lastIndex: number;
  changeCounter: number = 0;
  isIgnore: boolean;

  constructor(
    private filterService: FiltersService,
    private ui: UIService,
    public location: Location,
    private router: Router,
    private searchService: MainSearchPageFacadeService,
  ) {}

  ngOnInit(): void {
    this.isIgnore = this.location.path().includes('ignore');
    this.subs.push(
      this.filterService.activeFilter.subscribe((val) => {
        this.filter = val;
      })
    );
    if (
      this.location.path().includes('tv') ||
      this.location.path().includes('similar')
    ) {
      this.size = 'col-12';
    } else if (this.location.path().includes('seen')) {
      this.size = 'col-6';
    } else {
      this.subs.push(
        this.filterService.activeMoviesElementsSize.subscribe(
          (val) => (this.size = val || 'col-12')
        )
      );
    }
  }

  navigateTo(id: string, title: string, year: string) {
    if (id) {
      this.router.navigate(['/detailView/' + id]);
    } else {
      this.ui.loading.next(true);
      this.searchService
        .serachIdByTitle(title + '+' + year)
        .toPromise()
        .then((val) => this.router.navigate(['/detailView/' + val]), (err) => {
          this.ui.loading.next(false);
          this.ui.showTopSnackbar("Nie udało się znaleźć filmu")
        });
    }
  }

  indexChanged(event) {
    if (this.changeCounter === 0 && !this.location.path().includes('similar')) {
      this.viewport.scrollToIndex(this.ui.lastIndex.value, 'smooth');
    }
    if (this.size != 'col-12') {
      const dataLength = this.viewport.getDataLength();
      const nextStep = event + 6;
      this.viewport.setRenderedRange({
        start: 0,
        end: nextStep < dataLength ? nextStep : dataLength,
      });
    }
    this.changeCounter++;

    this.lastIndex = event;
  }

  ngOnDestroy() {
    if (this.subs != []) {
      this.subs.forEach((sub) => sub.unsubscribe());
    }
    if (this.location.path().includes('detailView')) {
      this.ui.lastIndex.next(this.lastIndex);
    } else {
      this.ui.lastIndex.next(0);
    }
  }
}
