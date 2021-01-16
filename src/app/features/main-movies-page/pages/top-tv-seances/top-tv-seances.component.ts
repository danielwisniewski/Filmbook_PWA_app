import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MainMoviesPageFacadeService } from '../../main-movies-page-facade.service';
import { TopTvSeancesModel } from '../../models/top-tv-seances.model';

@Component({
  selector: 'app-in-tv-today',
  templateUrl: './top-tv-seances.component.html',
  styleUrls: ['./top-tv-seances.component.css'],
})
export class TopTvSeancesComponent implements OnInit {
  filmsData$: Observable<TopTvSeancesModel[]>;
  constructor(
    private mainMoviesPageFacadeService: MainMoviesPageFacadeService
  ) {}

  ngOnInit(): void {
    this.filmsData$ = this.mainMoviesPageFacadeService.getTopTvSeances();
  }
}
