import { Component, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilmData } from '../../Models/film-data.model';
import { FilterModel } from '../../Models/filter.model';
import { FiltersService } from '../../services/filters.service';

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.css'],
})
export class GenreListComponent implements OnInit, OnDestroy {
  id: string;
  filmsData: Observable<FilmData[]>;
  size: string = 'col-6';
  sub: Subscription;
  filter: FilterModel;
  constructor(
    private route: ActivatedRoute,
    private filterService: FiltersService
  ) {}

  ngOnInit(): void {
    // this.route.data.subscribe((result) => {
    //   this.filmsData = result.movies;
    // });
    this.filmsData = this.route.data.pipe(map((val) => val.movies));
    this.id = this.route.snapshot.params['id'];
    this.sub = this.filterService.moviesFilters.subscribe(
      (val) => (this.filter = val)
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
