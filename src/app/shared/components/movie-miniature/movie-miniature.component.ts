import { Component, Input, OnInit } from '@angular/core';
import { FilmData } from '../../Models/film-data.model';

@Component({
  selector: 'app-movie-miniature',
  templateUrl: './movie-miniature.component.html',
  styleUrls: ['./movie-miniature.component.css']
})
export class MovieMiniatureComponent implements OnInit {
  @Input() filmData: FilmData;
  noImageUrl = "../../../assets/images/No-image-available.png";
  constructor() { }

  ngOnInit(): void {
  }

}
