import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FilmData } from 'src/app/shared/Models/film-data.model';
import { FilterModel } from 'src/app/shared/Models/filter.model';
import { FiltersService } from 'src/app/shared/services/filters.service';
import { FirestoreMoviesService } from 'src/app/shared/services/firestore-movies.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css'],
})
export class TopComponent implements OnInit, OnDestroy {
  filmsData: FilmData[];
  size: string = 'col-6';
  sub: Subscription;
  filter: FilterModel;

  constructor(
    private db: FirestoreMoviesService,
    private filterService: FiltersService
  ) {}

  ngOnInit(): void {
    this.sub = this.filterService.moviesFilters.subscribe(
      (val: FilterModel) => {
        this.filter = val;
      }
    );
    this.filmsData = this.db.getTop();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
