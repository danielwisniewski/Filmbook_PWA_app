import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FilmData } from 'src/app/shared/Models/film-data.model';
import { FirestoreMoviesService } from 'src/app/shared/services/firestore-movies.service';

@Component({
  selector: 'app-ignore-movies-list',
  templateUrl: './ignore-movies-list.component.html',
  styleUrls: ['./ignore-movies-list.component.css'],
})
export class IgnoreMoviesListComponent implements OnInit, OnDestroy {
  sub: Subscription;
  filmsData: FilmData[];
  isLoading: boolean;
  constructor(private db: FirestoreMoviesService, public location: Location) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.sub = this.db.ignore.subscribe((val) => {
      this.isLoading = false;
      console.log(val);
      this.filmsData = val;
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
