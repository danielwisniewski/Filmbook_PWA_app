import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FilmData } from 'src/app/core/models/film-data.model';
import { MainProfilePageFacadeService } from '../../main-profile-page-facade.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css'],
})
export class WatchlistComponent implements OnInit, OnDestroy {
  sub: Subscription;
  constructor(private facadeService: MainProfilePageFacadeService) {}

  ngOnInit(): void {
    this.sub = this.facadeService
      .getMoviesOnWatchList()
      .subscribe((result: FilmData[]) => {
        this.facadeService.changeCurrentList(result);
      });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.facadeService.closeMiniaturesSub();
      this.sub.unsubscribe();
    }
  }
}
