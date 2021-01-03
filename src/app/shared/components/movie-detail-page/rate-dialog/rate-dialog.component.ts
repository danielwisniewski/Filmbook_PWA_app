import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilmData } from 'src/app/shared/Models/film-data.model';
import { MovieDetailService } from '../movie-detail.service';

@Component({
  selector: 'app-rate-dialog',
  templateUrl: './rate-dialog.component.html',
  styleUrls: ['./rate-dialog.component.css'],
})
export class RateDialogComponent implements OnInit {
  rating: number;
  private starCount: number = 10;
  ratingArr = [];
  ratingDesc: string;
  private ratingDescArr: string[] = [
    'Brak oceny',
    'Nieporozumienie',
    'Bardzo zły',
    'Słaby',
    'Ujdzie',
    'Średni',
    'Niezły',
    'Dobry',
    'Bardzo dobry',
    'Rewelacyjny',
    'Arcydzieło!',
  ];

  constructor(
    private db: MovieDetailService,
    private _dialogRef: MatDialogRef<RateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FilmData
  ) {}

  ngOnInit(): void {
    this.rating = this.data.myRating ? this.data.myRating : 0;
    this.ratingDesc = this.ratingDescArr[this.rating]
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }

  showIcon(index: number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  onClick(rating: number) {
    this.rating = rating;
    this.ratingDesc = this.ratingDescArr[rating];
    return false;
  }

  onDelete() {
    this.data.seen = false;
    this.db.updateMovieOnProfile(this.data, 'seen');
    this._dialogRef.close();
  }

  onSaveRating() {
    this.data.seen = true;
    this.data.myRating = this.rating;
    this.db.updateMovieOnProfile(this.data, 'seen');
    this._dialogRef.close();
  }
}
