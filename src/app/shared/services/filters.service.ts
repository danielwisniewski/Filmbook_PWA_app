import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterModel } from '../Models/filter.model';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  moviesFilters = new BehaviorSubject<FilterModel>(null);
  profileFilters = new BehaviorSubject<FilterModel>(null);
  subs: Subscription[] = [];
  constructor(private db: AngularFirestore) {}

  setFilters(filters: FilterModel, document: string) {
    this.db
      .doc('users/' + localStorage.getItem('userId') + '/filters/' + document)
      .set(filters);
  }

  getFilter( path : string ) : FilterModel {
    let userFIlters = JSON.parse(localStorage.getItem('userFilters')) || {};
    console.log(!userFIlters[path])
    if ( !userFIlters[path] ) {
      userFIlters[path] = new FilterModel();
      localStorage.setItem('userFilters', JSON.stringify(userFIlters))
    } 
    return userFIlters[path]
  }

  fetchFilters() {
    if (!this.moviesFilters.value) {
      this.subs.push(
        this.db
          .doc('users/' + localStorage.getItem('userId') + '/filters/movies')
          .snapshotChanges()
          .pipe(map((snap) => <FilterModel>snap.payload.data()))
          .subscribe((val) => {
            if (val) this.moviesFilters.next(val);
            else
              this.setFilters(
                {
                  isOnSeen: null,
                  isOnWatchlist: null,
                  isOnService: null,
                  type: null,
                  isOnIgnore: true,
                  trigger: false,
                },
                'movies'
              );
          })
      );
    }
    if (!this.profileFilters.value) {
      this.subs.push(
        this.db
          .doc('users/' + localStorage.getItem('userId') + '/filters/profile')
          .snapshotChanges()
          .pipe(map((snap) => <FilterModel>snap.payload.data()))
          .subscribe((val) => {
            if (val) this.profileFilters.next(val);
            else
              this.setFilters(
                {
                  isOnSeen: null,
                  isOnWatchlist: null,
                  isOnService: null,
                  type: null,
                  isOnIgnore: true,
                  trigger: false,
                },
                'profile'
              );
          })
      );
    }
  }

  refreshFilter() {
    this.setFilters(this.moviesFilters.value, "movies");
    this.setFilters(this.profileFilters.value, "profile");
  }

  cancelSubscriptions() {
    this.subs.forEach((sub) => sub.unsubscribe());
    this.moviesFilters.next(null)
    this.profileFilters.next(null)
  }
}
