import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { Subscription } from 'rxjs';
import { FilmData } from '../../Models/film-data.model';
import { FilterModel } from '../../Models/filter.model';
import { FiltersService } from '../../services/filters.service';
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

  contextMenuPosition = { x: '0px', y: '0px' };

  constructor(
    private db: MovieDetailService,
    public dialog: MatDialog,
    private filterService: FiltersService
  ) {}

  ngOnInit(): void {
    this.subs.push(
      this.filterService.activeFilter.subscribe((val) => {
        this.filter = val;
      })
    );
    this.subs.push(
      this.filterService.activeMoviesElementsSize.subscribe(
        (val) => (this.size = val)
      )
    );
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
  }
}
