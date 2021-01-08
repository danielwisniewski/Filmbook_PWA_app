import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { FilmData } from '../shared/Models/film-data.model';

@Injectable({
  providedIn: 'root',
})
export class SerachMoviesService {
  private lastSearchResult: FilmData[];
  constructor(private http: HttpClient) {
    this.lastSearchResult = [];
  }

  searchByTitle(title: string) {
    const BASE_URL =
      'https://homeautodaniel.eu-gb.mybluemix.net/filmweb-search';
    return this.http
      .get<FilmData[]>(BASE_URL, {
        params: new HttpParams().set('q', title),
      })
      .pipe(
        map((films) => {
          return films.map((film: FilmData) => {
            film.id = film.link.replace('/', '_');
            return film;
          });
        })
      );
  }

  serachIdByTitle(title: string) {
    const BASE_URL =
      'https://homeautodaniel.eu-gb.mybluemix.net/filmweb-search-film';
    return this.http
      .get<any>(BASE_URL, {
        params: new HttpParams().set('q', title),
      })
      .pipe(
        map((val) => {
          return (val[0].link = val[0].link.replace('/', '_'));
        })
      );
  }

  getLastResult(): FilmData[] {
    return this.lastSearchResult.slice();
  }

  setLastResults(results: FilmData[]): void {
    results.forEach((result) => {
      this.lastSearchResult.unshift(result);
    });
    this.lastSearchResult = this.lastSearchResult.slice(0, 5);
  }
}
