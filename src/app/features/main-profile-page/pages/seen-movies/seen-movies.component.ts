import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FilmData } from 'src/app/core/models/film-data.model';
import { MainProfilePageFacadeService } from '../../main-profile-page-facade.service';

@Component({
  selector: 'app-seen-movies',
  templateUrl: './seen-movies.component.html',
  styleUrls: ['./seen-movies.component.css'],
})
export class SeenMoviesComponent implements OnInit {
  filmsData$: Observable<FilmData[]>;
  titleToFind: string;
  constructor(private facadeService: MainProfilePageFacadeService) {}

  ngOnInit(): void {
    this.filmsData$ = this.facadeService.getMoviesOnSeenList();
  }

  onSearchTitle(title: string) {
    this.titleToFind = title;
  }
}
