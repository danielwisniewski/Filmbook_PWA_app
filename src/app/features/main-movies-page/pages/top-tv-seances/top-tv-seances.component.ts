import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FilterModel } from 'src/app/shared/models/filter.model';
import { FiltersService } from 'src/app/shared/services/filters.service';
import { MainMoviesPageFacadeService } from '../../main-movies-page-facade.service';

@Component({
  selector: 'app-in-tv-today',
  templateUrl: './top-tv-seances.component.html',
  styleUrls: ['./top-tv-seances.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopTvSeancesComponent {
  filmData$ = this.facadeService.getTopTvSeances();
  constructor(private facadeService: MainMoviesPageFacadeService, private filterService: FiltersService) {
    this.filterService.activeMoviesElementsSize.next('col-12');
    this.filterService.activeFilter.next(new FilterModel)
  }
}
