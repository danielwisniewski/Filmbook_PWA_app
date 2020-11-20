import { HttpClient, HttpParams } from '@angular/common/http';
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
  constructor(
    private searchMoviesService: SerachMoviesService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  onKeydown(form: NgForm) {
    this.searchByTitle(form.value.serachMovie);
    form.reset();
  }

  searchByTitle(text: string) {
    const BASE_URL =
      'https://homeautodaniel.eu-gb.mybluemix.net/filmweb-search';
    return this.http
      .get<FilmData[]>(BASE_URL, {
        params: new HttpParams().set('q', text),
      })
      .subscribe((result) => {
        this.searchResult = result;
      });
  }
}
