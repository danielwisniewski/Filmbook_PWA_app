import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FilmData } from 'src/app/core/models/film-data.model';
import { MainProfilePageFacadeService } from '../../main-profile-page-facade.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css'],
})
export class WatchlistComponent implements OnInit {
  filmsData$: Observable<FilmData[]>;
  constructor(private facadeService: MainProfilePageFacadeService) {}

  ngOnInit(): void {
    this.filmsData$ = this.facadeService.getMoviesOnWatchList();
  }
}
