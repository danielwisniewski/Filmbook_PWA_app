import { Pipe, PipeTransform } from '@angular/core';
import { FilmData } from '../../core/models/film-data.model';
import { FilterModel } from '../models/filter.model';
import { FiltersService } from '../services/filters.service';

@Pipe({
  name: 'filter',
  pure: false,
})
export class FilterPipe implements PipeTransform {
  constructor(private filterService: FiltersService) {}

  transform(
    value: FilmData[],
    filter: FilterModel,
    ignore: boolean
  ): FilmData[] {
    if (value && filter) {
      if (!Object.values(filter).some((val) => val)) {
        return value;
      } else {
        let filterResult: FilmData[] = value;
        // if (filter.isOnService) {
        //   filterResult = filterResult.filter((film) => {
        //     return film.service === 'hbo' || film.service === 'netflix';
        //   });
        // }
        if (filter.type === 'serial') {
          filterResult = filterResult.filter((film) => {
            return film.type === 'serial';
          });
        }
        if (filter.type === 'film') {
          filterResult = filterResult.filter((film) => {
            return film.type === 'film';
          });
        }
        if (filter.isOnSeen) {
          filterResult = filterResult.filter((film) => !film.seen);
        }
        if (filter.isOnWatchlist) {
          filterResult = filterResult.filter((film) => !film.watchlist);
        }
        if (filter.minRating) {
          filterResult = filterResult.filter(
            (film) => film.rating >= filter.minRating
          );
        }
        if (!ignore) {
          filterResult = filterResult.filter((film) => !film.ignore);
        }

        this.filterService.elementCounter.next(filterResult.length);
        return filterResult;
      }
    }
  }
}
