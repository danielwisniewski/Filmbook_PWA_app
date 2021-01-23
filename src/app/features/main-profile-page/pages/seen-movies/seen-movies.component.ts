import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { combineLatest } from 'rxjs';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilmData } from 'src/app/core/models/film-data.model';
import { MainProfilePageFacadeService } from '../../main-profile-page-facade.service';

@Component({
  selector: 'app-seen-movies',
  templateUrl: './seen-movies.component.html',
  styleUrls: ['./seen-movies.component.css'],
})
export class SeenMoviesComponent implements OnInit, OnDestroy {
  sub: Subscription;
  sortedByTime$ = new BehaviorSubject<boolean>(null);
  titleToFind$ = new BehaviorSubject<string>('');
  currentList: FilmData[];
  constructor(private facadeService: MainProfilePageFacadeService) {}

  ngOnInit(): void {
    this.sub = combineLatest([
      this.facadeService.getMoviesOnSeenList(),
      this.titleToFind$.asObservable(),
      this.sortedByTime$.asObservable(),
    ])
      .pipe(
        map((combinedObs) => {
          if ( combinedObs[2] ) {
            combinedObs[0].sort((a, b) => (b.timeSeen || 0) - (a.timeSeen || 0));
          } else {
            combinedObs[0].sort((a, b) => (b.myRating || 0) - (a.myRating || 0));
          }
          return combinedObs;
        }),
        map((combinedObs) => {
          if (!combinedObs[1]) return combinedObs[0];
          else {
            return combinedObs[0].filter((film) =>
              film.title.toLowerCase().includes(combinedObs[1])
            );
          }
        })
      )
      .subscribe((result: any[]) => {
        this.facadeService.changeCurrentList(result);
      });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.facadeService.closeMiniaturesSub();
      this.sub.unsubscribe();
    }
  }

  onSearchTitle(title: string) {
    this.titleToFind$.next(title);
  }

  sortingChanged(sortedByTimeAdded) {
    this.sortedByTime$.next(sortedByTimeAdded);
  }
}
