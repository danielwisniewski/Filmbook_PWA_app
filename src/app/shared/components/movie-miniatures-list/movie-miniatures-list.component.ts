import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SerachMoviesService } from 'src/app/search/serach-movies.service';
import { FilmData } from '../../Models/film-data.model';
import { FilterModel } from '../../Models/filter.model';
import { FiltersService } from '../../services/filters.service';
import { UIService } from '../../services/ui.service';
import { MovieDetailService } from '../movie-detail-page/movie-detail.service';
import { RateDialogComponent } from '../movie-detail-page/rate-dialog/rate-dialog.component';

@Component({
  selector: 'app-movie-miniatures-list',
  templateUrl: './movie-miniatures-list.component.html',
  styleUrls: ['./movie-miniatures-list.component.css'],
})
export class MovieMiniaturesListComponent implements OnInit, OnDestroy {
  @Input() filmData: FilmData;
  size: string;
  filter: FilterModel;
  subs: Subscription[] = [];
  noImageUrl = '../../../assets/images/No-image-available.png';
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  contextMenuPosition = { x: '0px', y: '0px' };
  lastIndex: number;
  changeCounter: number = 0;
  isIgnore: boolean;

  constructor(
    private db: MovieDetailService,
    private filterService: FiltersService,
    private ui: UIService,
    public location: Location,
    private router: Router,
    private searchService: SerachMoviesService,
    public dialog: MatDialog
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

  onWatchlist(film: FilmData) {
    film.watchlist = !film.watchlist;
    this.db.updateMovieOnProfile(film, 'watchlist');
  }

  onSeen(film: FilmData) {
    this.dialog.open(RateDialogComponent, {
      data: film,
    });
  }

  onIgnore(film: FilmData) {
    film.ignore = !film.ignore;
    this.db.updateMovieOnProfile(film, 'ignore');
  }

  onRightClick(event: MouseEvent, data: FilmData) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { film: data };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
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
