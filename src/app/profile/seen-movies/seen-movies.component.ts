import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FilmData } from 'src/app/shared/Models/film-data.model';
import { FilterModel } from 'src/app/shared/Models/filter.model';
import { FiltersService } from 'src/app/shared/services/filters.service';
import { FirestoreMoviesService } from 'src/app/shared/services/firestore-movies.service';

@Component({
  selector: 'app-seen-movies',
  templateUrl: './seen-movies.component.html',
  styleUrls: ['./seen-movies.component.css'],
})
export class SeenMoviesComponent implements OnInit, OnDestroy {
  filmsData: FilmData[];
  isLoading: boolean;
  size: string = 'col-4';
  subs: Subscription[] = [];
  filter: FilterModel;
  constructor(
    private db: FirestoreMoviesService,
    private filterService: FiltersService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.subs.push(
      this.filterService.profileFilters.subscribe((val) => (this.filter = val))
    );
    this.subs.push(
      this.db.seenMovies.subscribe((val) => {
        this.isLoading = false;
        this.filmsData = val;
      })
    );
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.forEach((sub) => sub.unsubscribe());
    }
  }
}
