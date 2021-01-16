import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FilmData } from 'src/app/core/models/film-data.model';
import { MainProfilePageFacadeService } from '../../main-profile-page-facade.service';

@Component({
  selector: 'app-ignore-movies-list',
  templateUrl: './ignore-movies-list.component.html',
  styleUrls: ['./ignore-movies-list.component.css'],
})
export class IgnoreMoviesListComponent implements OnInit {
  filmsData$: Observable<FilmData[]>;
  constructor(
    private facadeService: MainProfilePageFacadeService,
    public location: Location
  ) {}

  ngOnInit(): void {
    this.filmsData$ = this.facadeService.getMoviesOnIgnoreList();
  }
}
