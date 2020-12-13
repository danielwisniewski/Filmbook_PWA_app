import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FilmData } from 'src/app/shared/Models/film-data.model';
import { FilterModel } from 'src/app/shared/Models/filter.model';
import { FiltersService } from 'src/app/shared/services/filters.service';
import { FirestoreMoviesService } from 'src/app/shared/services/firestore-movies.service';
import { UIService } from 'src/app/shared/services/ui.service';

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.css'],
})
export class RecommendedComponent implements OnInit, OnDestroy {
  filmsData: FilmData[];
  isLoading: boolean = false;
  size: string = 'col-6';
  subs: Subscription[] = [];
  filter: FilterModel;
  constructor(
    private db: FirestoreMoviesService,
    private filterService: FiltersService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.subs.push(
      this.filterService.moviesFilters.subscribe((val) => (this.filter = val))
    );
    this.subs.push(
      this.db.recommended.subscribe((val) => {
        this.isLoading = val ? false : true;
        this.filmsData = val;
      })
    );
    this.db.fetchRecomended();
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.forEach((sub) => sub.unsubscribe());
    }
  }
}
