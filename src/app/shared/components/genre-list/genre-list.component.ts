import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilmData } from '../../../core/models/film-data.model';

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.css'],
})
export class GenreListComponent implements OnInit, OnDestroy {
  id: string;
  sub: Subscription;
  filmsData: FilmData[];
  constructor(private route: ActivatedRoute, public location: Location) {}

  ngOnInit(): void {
    this.sub = this.route.data
      .pipe(map((val) => val.movies))
      .subscribe((val) => (this.filmsData = val));
    this.id = this.route.snapshot.params['id'];
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
