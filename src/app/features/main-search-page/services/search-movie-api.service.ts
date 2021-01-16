import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilmData } from 'src/app/core/models/film-data.model';
import { SearchResultModel } from '../models/search-result.model';

@Injectable({
  providedIn: 'root',
})
export class SearchMovieApiService {
  searchResult = new BehaviorSubject<SearchResultModel[]>(null);
  isLoading$ = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient ) {}

  searchMovieByTitle(title: string): void {
    const BASE_URL =
      'https://homeautodaniel.eu-gb.mybluemix.net/filmweb-search';
    this.isLoading$.next(true);
    this.http
      .get(BASE_URL, {
        params: new HttpParams().set('q', title),
      })
      .pipe(
        map((films: FilmData[]) => {
          return films.map((film: FilmData) => {
            return <SearchResultModel>{
              title: film.title,
              rating: film.rating,
              poster: film.poster,
              link: film.link,
              year: +film.year,
              id: film.link.replace('/', '_'),
            };
          });
        })
      )
      .subscribe((result : any ) => {
        this.searchResult.next(result);
      },
      (error : HttpErrorResponse) => {
        console.log(error)
        this.searchResult.next(null)
      },
      () => {
        this.isLoading$.next(false)
      } )

  }

}
