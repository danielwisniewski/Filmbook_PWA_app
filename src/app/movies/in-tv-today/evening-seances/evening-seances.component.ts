import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FilmData } from 'src/app/shared/Models/film-data.model';
import { MoviesInTvService } from '../movies-in-tv.service';

@Component({
  selector: 'app-evening-seances',
  templateUrl: './evening-seances.component.html',
  styleUrls: ['./evening-seances.component.css'],
})
export class EveningSeancesComponent implements OnInit, OnDestroy {
  filmsData: FilmData[];
  sub: Subscription;
  constructor(private tvService: MoviesInTvService) {}

  ngOnInit(): void {
    this.sub = this.tvService.filmsInEvening.subscribe(
      (val) => (this.filmsData = val)
    );
    this.tvService.fetchFilmsInEvening();
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
