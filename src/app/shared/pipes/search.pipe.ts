import { Pipe, PipeTransform } from '@angular/core';
import { FilmData } from '../../core/models/film-data.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: FilmData[], title: string): FilmData[] {
    let filterResult: FilmData[] = value;
    if ( title ) {
      filterResult = filterResult.filter( film => film.title.includes(title) )
    }
    return filterResult;
  }

}
