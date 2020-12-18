import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AwardsModel } from '../awards.model';
import { MovieDetailService } from '../movie-detail.service';

@Injectable({ providedIn: 'root' })
export class AwardsResolveService implements Resolve<AwardsModel[]> {
  constructor(private db: MovieDetailService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<AwardsModel[]> | Promise<AwardsModel[]> | any {
    return this.db.getAwards(route.paramMap.get('id'));
  }
}
