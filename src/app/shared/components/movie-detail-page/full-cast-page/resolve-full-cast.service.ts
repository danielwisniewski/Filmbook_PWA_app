import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MovieDetailService } from '../movie-detail.service';
import { CastModel } from './cast.model';

@Injectable({ providedIn: 'root' })
export class FullCastResolveService implements Resolve<CastModel[]> {
  constructor(private db: MovieDetailService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<CastModel[]> | Promise<CastModel[]> | any {
    return this.db.getFullCast(route.paramMap.get('id'));
  }
}