import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilmData } from 'src/app/core/models/film-data.model';
import { FilmsStateService } from 'src/app/shared/state/films-state.service';
import { FetchMoviesByGenreService } from './services/fetch-movies-by-genre.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesByGenreFacadeService {

constructor(private genreService: FetchMoviesByGenreService ,private FilmsStateService: FilmsStateService) { }

getFilmsData() : Observable<FilmData[]> {
  return this.FilmsStateService.getMoviesByGenre()
}

changeId(id:string) {
  this.genreService.genre.next(id)
}

}
