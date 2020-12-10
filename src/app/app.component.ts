import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { MoviesServiceService } from './movies/movies-service.service';
import { FirestoreMoviesService } from './shared/services/firestore-movies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'MovieApp';

  constructor(
    private authSrevice: AuthService,
    private db: FirestoreMoviesService
  ) {}

  ngOnInit() {
    this.authSrevice.initAuthListener();
  }

  ngOnDestroy() {
    this.db.cancelSubscriptions();
  }
}
