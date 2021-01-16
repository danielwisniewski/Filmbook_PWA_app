import { Pipe, PipeTransform } from '@angular/core';
import { MainProfilePageFacadeService } from 'src/app/features/main-profile-page/main-profile-page-facade.service';
import { FilmData } from '../../core/models/film-data.model';

@Pipe({
  name: 'isOnLists',
})
export class IsOnListsPipe implements PipeTransform {
  onWatchlist: FilmData[];
  onSeen: FilmData[];
  onIgnore: FilmData[];
  constructor(private profileDb: MainProfilePageFacadeService) {}

  transform(value: FilmData[] | FilmData): FilmData[] | FilmData {
    if (value && Array.isArray(value)) {
      this.getLists();
      return value.map((film: FilmData) => this.checkMovie(film));
    } else if (value && !Array.isArray(value)) {
      this.getLists();
      return this.checkMovie(value);
    } else {
      return;
    }
  }

  private checkMovie(film: FilmData): FilmData {
    const WATCHLIST_INDEX = this.onWatchlist?.findIndex(
      (watchlistMovie: FilmData) => watchlistMovie.id === film.id
    );
    const SEEN_INDEX = this.onSeen?.findIndex(
      (seenMovie: FilmData) => seenMovie.id === film.id
    );
    const IGNORE_INDEX = this.onIgnore?.findIndex(
      (ignoreMovie: FilmData) => ignoreMovie.id === film.id
    );
    return <FilmData>{
      watchlist: WATCHLIST_INDEX > -1 ? true : false,
      timeAdded:
        WATCHLIST_INDEX > -1
          ? this.onWatchlist[WATCHLIST_INDEX].timeAdded
          : null,
      seen: SEEN_INDEX > -1 ? true : false,
      timeSeen: SEEN_INDEX > -1 ? this.onSeen[SEEN_INDEX].timeSeen : null,
      myRating: SEEN_INDEX > -1 ? this.onSeen[SEEN_INDEX].myRating : null,
      ignore: IGNORE_INDEX > -1 ? true : false,
      ...film,
    };
  }

  private getLists(): void {
    const lists = this.profileDb.getProfileMoviesLists();
    this.onWatchlist = lists.watchList;
    this.onSeen = lists.seenList;
    this.onIgnore = lists.ignoreList;
  }
}
