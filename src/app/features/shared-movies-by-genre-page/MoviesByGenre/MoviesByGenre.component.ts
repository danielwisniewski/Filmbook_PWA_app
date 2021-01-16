import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilmData } from 'src/app/core/models/film-data.model';

@Component({
  selector: 'app-MoviesByGenre',
  templateUrl: './MoviesByGenre.component.html',
  styleUrls: ['./MoviesByGenre.component.scss']
})
export class MoviesByGenreComponent implements OnInit {
  filmsData$ : Observable<FilmData[]>;
  id : string;
  constructor(private route: ActivatedRoute, public location: Location) { }

  ngOnInit() {
    this.filmsData$ = this.route.data
      .pipe(
        map( response => response.movies )
      );
    this.id = this.route.snapshot.params['id']
  }

}
