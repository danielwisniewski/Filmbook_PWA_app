import { Location } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilmData } from '../../core/models/film-data.model';
import { UIService } from '../../shared/services/ui.service';
import { MovieDetailService } from './movie-detail.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail-page.component.html',
  styleUrls: ['./movie-detail-page.component.css'],
})
export class MovieDetailPageComponent implements OnInit, OnDestroy {
  isLoading = false;
  filmData: FilmData;
  filmData$: Observable<FilmData>
  subs: Subscription[] = [];
  selectedTab = 0;

  constructor(
    private route: ActivatedRoute,
    private ui: UIService,
    private db: MovieDetailService,
    public sanitizer: DomSanitizer,
    public location: Location
  ) {}

  ngOnInit(): void {
    this.ui.loading.next(true);
    this.filmData$ = this.route.data.pipe( map( val => val.movies ) )
    this.subs.push(
      this.route.data.pipe(map((val) => val.movies)).subscribe((val) => {
        this.ui.loading.next(false);
        this.filmData = val;
        this.db.setLastFilmData(this.filmData);
        if (!this.filmData.similar) {
          this.db.findSimilarMovies(this.filmData.title, this.filmData.id);
        }
        this.sanitizer.bypassSecurityTrustResourceUrl(this.filmData.poster);
      })
    );

    this.subs.push(this.ui.loading.subscribe((val) => (this.isLoading = val)));
  }

  scrollTo(el: HTMLElement) {
    el.scrollIntoView({
      behavior: 'smooth',
    });
  }

  changeTab(tabIndex: number) {
    this.selectedTab = tabIndex;
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }
}
