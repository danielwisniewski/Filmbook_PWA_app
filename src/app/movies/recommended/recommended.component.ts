import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FilmData } from 'src/app/shared/Models/film-data.model';
import { FirestoreMoviesService } from 'src/app/shared/services/firestore-movies.service';

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.css'],
})
export class RecommendedComponent implements OnInit, OnDestroy {
  filmsData: FilmData[];
  isLoading: boolean = false;
  sub: Subscription;
  constructor(private db: FirestoreMoviesService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.sub = this.db.recommended.subscribe((val) => {
      this.isLoading = val ? false : true;
      this.filmsData = val;
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
