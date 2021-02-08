import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FilmData } from 'src/app/core/models/film-data.model';
import { FilterModel } from 'src/app/shared/models/filter.model';
import { FiltersService } from 'src/app/shared/services/filters.service';
import { MainProfilePageFacadeService } from '../../main-profile-page-facade.service';

@Component({
  selector: 'app-ignore-movies-list',
  templateUrl: './ignore-movies-list.component.html',
  styleUrls: ['./ignore-movies-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IgnoreMoviesListComponent {
  filmData$: Observable<
    FilmData[]
  > = this.facadeService.getMoviesOnIgnoreList();

  constructor(
    private facadeService: MainProfilePageFacadeService,
    private filterService: FiltersService,
    public location: Location
  ) {
    this.filterService.activeMoviesElementsSize.next('col-6');
    this.filterService.activeFilter.next(new FilterModel)
  }
}
