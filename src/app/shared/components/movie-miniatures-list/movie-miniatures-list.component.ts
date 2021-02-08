import { Location, ViewportScroller } from '@angular/common';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MainSearchPageFacadeService } from 'src/app/features/main-search-page/main-search-page-facade.service';
import { FilmData } from '../../../core/models/film-data.model';
import { FiltersService } from '../../services/filters.service';
import { UIService } from '../../services/ui.service';

@Component({
  selector: 'app-movie-miniatures-list',
  templateUrl: './movie-miniatures-list.component.html',
  styleUrls: ['./movie-miniatures-list.component.css'],
})
export class MovieMiniaturesListComponent implements OnDestroy, AfterViewInit, AfterViewChecked {
  @Input() filmData: Observable<FilmData[]>;
  size: Observable<string> = this.filterService.activeMoviesElementsSize.asObservable();
  noImageUrl = '../../../assets/images/No-image-available.png';
  private lastId: string;

  constructor(
    private filterService: FiltersService,
    private ui: UIService,
    public location: Location,
    private router: Router,
    private searchService: MainSearchPageFacadeService,
    private viewportScroller: ViewportScroller
  ) {}

  ngAfterViewInit(): void {
  }

  ngAfterViewChecked() : void {
  }

  navigateTo(id: string, title: string, year: string, index) {
    this.lastId = index;
    if (id) {
      this.router.navigate(['/detailView/' + id]);
    } else {
      this.ui.loading.next(true);
      this.searchService
        .serachIdByTitle(title + '+' + year)
        .toPromise()
        .then(
          (val) => this.router.navigate(['/detailView/' + val]),
          (err) => {
            this.ui.loading.next(false);
            this.ui.showTopSnackbar('Nie udało się znaleźć filmu');
          }
        );
    }
  }

  ngOnDestroy() {
    if (this.location.path().includes('detailView')) {
      this.ui.lastIndex.next(this.lastId);
    } else {
      this.ui.lastIndex.next('');
    }
  }
}
