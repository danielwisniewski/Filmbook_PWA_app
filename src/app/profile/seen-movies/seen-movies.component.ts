import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FilmData } from 'src/app/shared/Models/film-data.model';
import { FirestoreMoviesService } from 'src/app/shared/services/firestore-movies.service';

@Component({
  selector: 'app-seen-movies',
  templateUrl: './seen-movies.component.html',
  styleUrls: ['./seen-movies.component.css'],
})
export class SeenMoviesComponent implements OnInit, OnDestroy {
  filmsData: FilmData[];
  isLoading: boolean;
  title: string;
  sub: Subscription;
  constructor(private db: FirestoreMoviesService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.sub = this.db.seenMovies.subscribe((val) => {
      this.isLoading = false;
      this.filmsData = val;
    });
  }

  onSearchTitle(title: string) {
    this.title = title;
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
