import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { completeMovieData } from './../../services/db.utils';
import { FilmData } from 'src/app/core/models/film-data.model';
import { FetchUserMoviesListsService } from 'src/app/features/main-profile-page/services/fetch-user-movies-lists.service';

@Injectable({
  providedIn: 'root',
})
export class MovieMiniatureListService {
  closeSub$ = new Subject<boolean>();
  currentList$ = new BehaviorSubject<FilmData[]>(null);
  movies$ = new BehaviorSubject<FilmData[]>(null);
  isLoading$ = new BehaviorSubject<boolean>(false);
  constructor(private profileDb: FetchUserMoviesListsService) {
    this.getMovies();
  }

  private getMovies(): void {
    combineLatest([this.getCurrentList(), this.getProfileLists()])
      .pipe(
        tap(() => this.isLoading$.next(true)),
        filter((result) => result[1] !== null && result[0] !== null),
        map((result) => {
          this.isLoading$.next(false);
          const currentList = result[0];
          const profileList = result[1];
          return currentList.map((element) => {
            if (!!element.id) {
              const index = this.findIndex(element, profileList);
              return completeMovieData(element, index, profileList);
            } else {
              return element;
            }
          });
        }),
        tap((val) => {
          this.movies$.next(val);
        })
      )
      .subscribe();
  }

  private getCurrentList(): Observable<FilmData[]> {
    return this.currentList$.asObservable();
  }

  private getProfileLists(): Observable<FilmData[]> {
    return this.profileDb.profileList$.asObservable();
  }

  private findIndex(value: FilmData, list: FilmData[]) {
    const index = list.findIndex((film) => film.id === value.id);
    return index;
  }
}
