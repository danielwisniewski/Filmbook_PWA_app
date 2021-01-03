import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilmData } from 'src/app/shared/Models/film-data.model';
import { MovieDetailService } from '../../movie-detail.service';
import { RateDialogComponent } from '../../rate-dialog/rate-dialog.component';

@Component({
  selector: 'app-initial-view',
  templateUrl: './initial-view.component.html',
  styleUrls: ['./initial-view.component.css'],
})
export class InitialViewComponent implements OnInit {
  @Input() filmData: FilmData;
  constructor(private db: MovieDetailService, public dialog: MatDialog) {}

  ngOnInit(): void {}

  onWatchlist() {
    this.filmData.watchlist = !this.filmData.watchlist;
    this.db.updateMovieOnProfile(this.filmData, 'watchlist');
  }

  addToSeenClicked() {
    this.dialog.open(RateDialogComponent, {
      data: this.filmData,
    });
  }
}
