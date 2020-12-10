import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { FilmData } from '../../Models/film-data.model';
import { FirestoreMoviesService } from '../../services/firestore-movies.service';
import { RateDialogComponent } from './rate-dialog/rate-dialog.component';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailPageComponent implements OnInit {
  isLoading = false;
  filmData: FilmData;

  constructor(
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private db: FirestoreMoviesService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.data
      .pipe(
        take(1),
        map((val) => val.movies)
      )
      .subscribe((val) => {
        this.filmData = val;
      });
  }

  addToWatchlist() {
    if (!this.filmData.watchlist) {
      this.db.addToMyProfile(this.filmData, 'watchlist').subscribe(() => {
        this.showSnackbar('Dodano do listy');
        this.getData()
      });
    } else {
      this.db.deleteFromMyProfile(this.filmData.id, 'watchlist');
      this.getData();
      this.showSnackbar('Film został usunięty z Twojej listy');
    }
  }

  private getData() {
    this.db
      .fetchMovieDetailData(this.filmData.id)
      .pipe(take(1))
      .subscribe((val:FilmData) => {
        this.filmData = val;
      });
  }

  addToSeenClicked() {
    const _dialog = this.dialog.open(RateDialogComponent, {
      data: this.filmData,
    });
    _dialog
      .afterClosed()
      .toPromise()
      .then(() => this.getData());
  }

  private showSnackbar(text: string) {
    this._snackBar.open(text, 'Ok', {
      duration: 3000,
      verticalPosition: 'bottom',
    });
  }
}
