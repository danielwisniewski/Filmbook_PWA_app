import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilmData } from '../../Models/film-data.model';

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.css'],
})
export class GenreListComponent implements OnInit {
  id: string;
  filmsData: Observable<FilmData[]>;
  size: string = 'col-6';
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.filmsData = this.route.data.pipe(map((val) => val.movies));
    this.id = this.route.snapshot.params['id'];
  }
}
