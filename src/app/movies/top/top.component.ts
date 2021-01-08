import { Component, OnInit } from '@angular/core';
import { FilmData } from 'src/app/shared/Models/film-data.model';
import { FirestoreMoviesService } from 'src/app/shared/services/firestore-movies.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css'],
})
export class TopComponent implements OnInit {
  filmsData: FilmData[];

  constructor(private db: FirestoreMoviesService) {}

  ngOnInit(): void {
    this.filmsData = this.db.getTop();
  }
}
