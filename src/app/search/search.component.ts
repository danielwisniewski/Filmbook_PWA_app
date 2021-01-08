import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FilmData } from '../shared/Models/film-data.model';
import { SerachMoviesService } from './serach-movies.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchResult: FilmData[];
  lastResult: FilmData[];
  isLoading = false;
  title = 'Wyszukaj';
  constructor(private searchMoviesService: SerachMoviesService) {
    this.searchResult = [];
  }

  ngOnInit(): void {
    this.lastResult = this.searchMoviesService.getLastResult();
  }

  onKeydown(form: NgForm) {
    this.searchByTitle(form.value.serachMovie);
    form.reset();
  }

  searchByTitle(parameter: string) {
    this.isLoading = true;
    this.searchMoviesService.searchByTitle(parameter).subscribe(
      (result) => {
        this.isLoading = false;
        this.searchResult = result;
        this.searchMoviesService.setLastResults(result);
      },
      (error: HttpErrorResponse) => {
        this.isLoading = false;
      }
    );
  }
}
