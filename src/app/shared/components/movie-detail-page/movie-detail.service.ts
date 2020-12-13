import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FilmData } from '../../Models/film-data.model';
import { FiltersService } from '../../services/filters.service';
import { UIService } from '../../services/ui.service';

@Injectable({
  providedIn: 'root',
})
export class MovieDetailService {
  filmData: FilmData;
  constructor(private firestore: AngularFirestore, private ui: UIService, private filterService: FiltersService) {}

  updateMovieOnProfile(film: FilmData, collection: string) {
    if (!film[collection]) {
      this.firestore
        .doc(
          'users/' +
            localStorage.getItem('userId') +
            '/' +
            collection +
            '/' +
            film.id
        )
        .delete()
        .then(() => {
          this.ui.showTopSnackbar('Usunięto z listy');
          this.filterService.refreshFilter();
        });
    } else {
      this.firestore
        .doc(
          'users/' +
            localStorage.getItem('userId') +
            '/' +
            collection +
            '/' +
            film.id
        )
        .set(film)
        .then(() => {
          this.ui.showTopSnackbar('Dodano do listy');
          this.filterService.refreshFilter();
        });
    }
  }
}
