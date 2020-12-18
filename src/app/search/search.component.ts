import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { first, map } from 'rxjs/operators';
import { FilmData } from '../shared/Models/film-data.model';
import { FiltersService } from '../shared/services/filters.service';
import { SerachMoviesService } from './serach-movies.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  searchResult: FilmData[];
  lastResult: FilmData[];
  isLoading = false;
  title = 'Wyszukaj';
  constructor(
    private searchMoviesService: SerachMoviesService,
    private router: Router,
    private filterService: FiltersService
  ) {}

  ngOnInit(): void {
    if (!this.searchMoviesService.lastSearchResult.value) {
      this.searchMoviesService.fetchSearchResult();
    }
    this.filterService.getFilter(this.router.url)
    this.searchMoviesService.lastSearchResult
      .pipe(first((val) => val != null))
      .subscribe((val) => (this.lastResult = val));
  }

  onKeydown(form: NgForm) {
    this.searchByTitle(form.value.serachMovie);
    form.reset();
  }

  searchByTitle(parameter: string) {
    this.isLoading = true;
    this.lastResult = null;
    this.searchMoviesService.searchByTitle(parameter).subscribe(
      (result) => {
        this.isLoading = false;
        this.searchResult = result;
      },
      (error: HttpErrorResponse) => {
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy() {
    if (this.searchResult) {
      this.searchMoviesService.setLastSearchResult(this.searchResult);
    }
  }
}
