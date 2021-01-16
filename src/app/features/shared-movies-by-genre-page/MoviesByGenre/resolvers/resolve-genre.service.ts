import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { FilmData } from '../../../../core/models/film-data.model';
import { FetchMoviesByGenreService } from '../services/fetch-movies-by-genre.service';

@Injectable({
  providedIn: 'root'
})
export class ResolveGenreService implements Resolve<FilmData[]> {

  constructor(private genreService: FetchMoviesByGenreService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.genreService.fetchMoviesByGenre(route.paramMap.get('id'))
  }
}
