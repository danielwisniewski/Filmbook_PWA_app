import { Component, OnInit } from '@angular/core';
import { FilmData } from 'src/app/shared/Models/film-data.model';
import { MoviesInTvService } from '../movies-in-tv.service';

@Component({
  selector: 'app-evening-seances',
  templateUrl: './evening-seances.component.html',
  styleUrls: ['./evening-seances.component.css'],
})
export class EveningSeancesComponent implements OnInit {
  filmsData: FilmData[];
  constructor(private tvService: MoviesInTvService) {}

  ngOnInit(): void {
    this.tvService.getFilmsThisEvening().subscribe((result) => {
      this.filmsData = result.filter((film) => film.title);
      console.log(this.filmsData);
    });
  }
}
