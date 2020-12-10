import { Component, Input, OnInit } from '@angular/core';
import { FilmData } from '../../Models/film-data.model';

@Component({
  selector: 'app-movie-miniatures-list',
  templateUrl: './movie-miniatures-list.component.html',
  styleUrls: ['./movie-miniatures-list.component.css']
})
export class MovieMiniaturesListComponent implements OnInit {
  @Input() filmData: FilmData;
  @Input() size: string = "col-12"
  noImageUrl = "../../../assets/images/No-image-available.png";
  constructor() { }

  ngOnInit(): void {
  }

}
