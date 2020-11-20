import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FilmData } from '../shared/Models/film-data.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  filmsData : FilmData[];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const BASE_URL = "https://b89d1667-e790-4e13-980b-a3eaec728d6e-bluemix.cloudant.com/tv_today/in_tv_today";
    this.http.get<any>(BASE_URL).subscribe(
      result => {
        this.filmsData = result.data;
      }
    )
  }


}
