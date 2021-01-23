import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilmData } from 'src/app/core/models/film-data.model';
import { UIService } from 'src/app/shared/services/ui.service';
import { MovieDetailService } from '../../movie-detail.service';

@Component({
  selector: 'app-similar-movies',
  templateUrl: './similar-movies.component.html',
  styleUrls: ['./similar-movies.component.css'],
})
export class SimilarMoviesComponent implements OnInit, OnDestroy {
  sub: Subscription;
  filmData: FilmData[];
  title: string;
  isLoading: boolean;
  constructor(
    private db: MovieDetailService,
    private ui: UIService,
    private route: ActivatedRoute,
    public location: Location
  ) {}

  ngOnInit(): void {
    this.sub = this.ui.loading.subscribe((val) => (this.isLoading = val));
    const ID = this.route.snapshot.paramMap.get('id');
    const DATA = this.db.getLastFilmsData(ID);
    this.db.changeCurrentList(DATA.similar);
    this.title = DATA.title;
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
