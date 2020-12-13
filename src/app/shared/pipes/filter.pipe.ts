import { Pipe, PipeTransform } from '@angular/core';
import { FilmData } from '../Models/film-data.model';
import { FilterModel } from '../Models/filter.model';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: FilmData[], filter: FilterModel): FilmData[] {
    if (value && filter) {
      if (!Object.values(filter).some((val) => val)) {
        return value;
      } else {
        let filterResult: FilmData[] = value;
        if (filter.isOnService) {
          filterResult = filterResult.filter((film) => {
            return film.service === 'hbo' || film.service === 'netflix';
          });
        }
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
        if (filter.isOnIgnore) {
          filterResult = filterResult.filter((film) => !film.ignore);
        }
        return filterResult;
      }
    }
  }
}
