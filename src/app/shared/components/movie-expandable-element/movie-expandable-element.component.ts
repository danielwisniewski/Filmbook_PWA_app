import { Component, Input, OnInit } from '@angular/core';
import { FilmData } from 'src/app/shared/Models/film-data.model';

@Component({
  selector: 'app-movie-expandable-element',
  templateUrl: './movie-expandable-element.component.html',
  styleUrls: ['./movie-expandable-element.component.css']
})
export class MovieExpandableElementComponent implements OnInit {
  @Input() filmData: FilmData;
  noImageUrl = "../../../assets/images/No-image-available.png";
  constructor() { }

  ngOnInit(): void {
  }

}
