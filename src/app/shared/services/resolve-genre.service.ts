import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { FilmData } from '../Models/film-data.model';
import { FirestoreMoviesService } from './firestore-movies.service';

@Injectable({
  providedIn: 'root'
})
export class ResolveGenreService implements Resolve<FilmData[]> {

  constructor(private firebaseDb: FirestoreMoviesService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.firebaseDb.fetchFilmsByGenreFirebase(route.paramMap.get('id'))
  }
}
