import { Pipe, PipeTransform } from '@angular/core';
import { MainProfilePageFacadeService } from 'src/app/features/main-profile-page/main-profile-page-facade.service';
import { FilmData } from '../../core/models/film-data.model';

@Pipe({
  name: 'isOnLists',
})
export class IsOnListsPipe implements PipeTransform {
  private list: FilmData[];
  constructor(private profileDb: MainProfilePageFacadeService) {
  }

  transform(value: FilmData[]): FilmData[] {
    return value
  }
}
