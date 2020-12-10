import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FilmData } from 'src/app/shared/Models/film-data.model';
import { FilterModel } from 'src/app/shared/Models/filter.model';
import { FiltersService } from 'src/app/shared/services/filters.service';
import { FirestoreMoviesService } from 'src/app/shared/services/firestore-movies.service';

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.css'],
})
export class RecommendedComponent implements OnInit, OnDestroy {
  filmsData: Observable<FilmData[]>;
  isLoading: boolean;
  size: string = 'col-6';
  sub: Subscription;
  filter: FilterModel;
  constructor(private db: FirestoreMoviesService, private filterService: FiltersService) {}

  ngOnInit(): void {
    this.isLoading = true;
    if (!this.db.recommended.value) {
      this.db.fetchRecomended();
    }
    this.sub = this.filterService.moviesFilters.subscribe(val => this.filter = val);
    this.filmsData = this.db.recommended;

    if (typeof this.filmsData != undefined) this.isLoading = false;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
