import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MainMoviesPageFacadeService } from '../../main-movies-page-facade.service';
import { EveningTvSeancesModel } from '../../models/evening-tv-seances.model';

@Component({
  selector: 'app-evening-seances',
  templateUrl: './evening-tv-seances.component.html',
  styleUrls: ['./evening-tv-seances.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EveningTvSeancesComponent {
  constructor(
    private mainMoviesPageFacadeService: MainMoviesPageFacadeService
  ) {}
  eveningTvSeances$: Observable<
    EveningTvSeancesModel[]
  > = this.mainMoviesPageFacadeService.getEveningTvSeances();
}
