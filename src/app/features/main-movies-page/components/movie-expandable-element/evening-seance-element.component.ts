import { Component, Input, OnInit } from '@angular/core';
import { EveningTvSeancesModel } from '../../models/evening-tv-seances.model';

@Component({
  selector: 'app-evening-seance-element',
  templateUrl: './evening-seance-element.component.html',
  styleUrls: ['./evening-seance-element.component.css']
})
export class EveningSeanceElementComponent implements OnInit {
  @Input() filmData: EveningTvSeancesModel;
  noImageUrl = "../../../assets/images/No-image-available.png";
  constructor() { }

  ngOnInit(): void {
  }

}
