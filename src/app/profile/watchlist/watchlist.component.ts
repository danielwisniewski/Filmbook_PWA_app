import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { finalize, first } from 'rxjs/operators';
import { FilmData } from 'src/app/shared/Models/film-data.model';
import { FilterModel } from 'src/app/shared/Models/filter.model';
import { FiltersService } from 'src/app/shared/services/filters.service';
import { FirestoreMoviesService } from 'src/app/shared/services/firestore-movies.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css'],
})
export class WatchlistComponent implements OnInit, OnDestroy {
  filmsData: Observable<FilmData[]>;
  isLoading: boolean;
  size: string = 'col-12';
  sub: Subscription;
  filter: FilterModel;
  constructor(
    private db: FirestoreMoviesService,
    private filterService: FiltersService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    if (!this.db.watchlist.value) {
      this.db.fetchWatchlist();
    }

    this.sub = this.filterService.profileFilters.subscribe(
      (val) => (this.filter = val)
    );

    this.filmsData = this.db.watchlist;
    if (typeof this.filmsData != undefined) this.isLoading = false;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
