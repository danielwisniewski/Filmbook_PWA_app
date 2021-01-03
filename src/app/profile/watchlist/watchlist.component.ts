import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
  filmsData: FilmData[];
  isLoading: boolean;
  size: string = 'col-12';
  sub: Subscription;
  constructor(private db: FirestoreMoviesService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.sub = this.db.watchlist.subscribe((val) => {
      this.isLoading = false;
      this.filmsData = val;
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}