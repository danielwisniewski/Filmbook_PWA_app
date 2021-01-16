import { Component, Input, OnInit } from '@angular/core';
import { FilmData } from 'src/app/core/models/film-data.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  @Input() filmData: FilmData;
  constructor() { }

  ngOnInit(): void {
  }

}
