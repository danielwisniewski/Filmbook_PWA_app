import { Component, Input, OnInit } from '@angular/core';
import { TelevisionSeancesModel } from '../../televisionSeances.model';

@Component({
  selector: 'app-tv-seances',
  templateUrl: './tv-seances.component.html',
  styleUrls: ['./tv-seances.component.css']
})
export class TvSeancesComponent implements OnInit {
  @Input() tvSeances: TelevisionSeancesModel[]
  constructor() { }

  ngOnInit(): void {
  }

}
