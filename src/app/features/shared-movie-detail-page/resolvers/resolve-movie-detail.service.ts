import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { MovieDetailService } from '../movie-detail.service';
import { FilmData } from '../../../core/models/film-data.model';

@Injectable({
  providedIn: 'root',
})
export class ResolveMovieDetailService implements Resolve<FilmData> {
  constructor(
    private firebaseDb: MovieDetailService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.firebaseDb.fetchMovieDetailData(route.paramMap.get('id'))
  }

}
