import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MainMoviesPageFacadeService } from '../../main-movies-page-facade.service';
import { EveningTvSeancesModel } from '../../models/evening-tv-seances.model';

@Component({
  selector: 'app-evening-seances',
  templateUrl: './evening-tv-seances.component.html',
  styleUrls: ['./evening-tv-seances.component.css'],
})
export class EveningTvSeancesComponent implements OnInit {
  eveningTvSeances$: Observable<EveningTvSeancesModel[]>;
  constructor(private mainMoviesPageFacadeService: MainMoviesPageFacadeService) {}

  ngOnInit(): void {
    this.eveningTvSeances$ = this.mainMoviesPageFacadeService.getEveningTvSeances()
  }
}
