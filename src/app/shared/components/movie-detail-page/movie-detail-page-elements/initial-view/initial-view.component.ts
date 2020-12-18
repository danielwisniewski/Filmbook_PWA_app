import { Component, Input, OnInit } from '@angular/core';
import { FilmData } from 'src/app/shared/Models/film-data.model';

@Component({
  selector: 'app-initial-view',
  templateUrl: './initial-view.component.html',
  styleUrls: ['./initial-view.component.css']
})
export class InitialViewComponent implements OnInit {
  @Input() filmData: FilmData;
  constructor() { }

  ngOnInit(): void {
  }

}
