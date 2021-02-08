import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FilmData } from 'src/app/core/models/film-data.model';
import { FilterModel } from 'src/app/shared/models/filter.model';
import { FiltersService } from 'src/app/shared/services/filters.service';
import { MainProfilePageFacadeService } from '../../main-profile-page-facade.service';

@Component({
  selector: 'app-seen-movies',
  templateUrl: './seen-movies.component.html',
  styleUrls: ['./seen-movies.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeenMoviesComponent {
  filmData$: Observable<FilmData[]> = this.facadeService.getMoviesOnSeenList();
  
  constructor(private facadeService: MainProfilePageFacadeService, private filterService: FiltersService) {
    this.filterService.activeMoviesElementsSize.next('col-6');
    this.filterService.activeFilter.next(new FilterModel)
  }

  onSearchTitle(title: string) {
    this.facadeService.titleToFind$.next(title);
  }

  sortingChanged(sortedByTimeAdded) {
    this.facadeService.sortedByTime$.next(sortedByTimeAdded);
  }
}
