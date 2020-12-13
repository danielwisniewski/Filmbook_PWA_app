import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilmData } from '../../Models/film-data.model';
import { MovieDetailService } from './movie-detail.service';
import { RateDialogComponent } from './rate-dialog/rate-dialog.component';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailPageComponent implements OnInit, OnDestroy {
  isLoading = false;
  filmData: FilmData;
  sub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private db : MovieDetailService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.sub = this.route.data
      .pipe(
        map((val) => val.movies)
      )
      .subscribe((val) => {
        this.isLoading = false;
        this.filmData = val;
      });
  }

  onWatchlist() {
    this.filmData.watchlist = !this.filmData.watchlist;
    this.db.updateMovieOnProfile(this.filmData, 'watchlist')
  }


  addToSeenClicked() {
    this.dialog.open(RateDialogComponent, {
      data: this.filmData,
    });
  }

  ngOnDestroy() {
    if ( this.sub ) {
      this.sub.unsubscribe();
    }
  }
}
