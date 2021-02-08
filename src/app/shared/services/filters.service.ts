import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FilterModel } from '../models/filter.model';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  activeFilter = new BehaviorSubject<FilterModel>(null);
  activeMoviesElementsSize = new BehaviorSubject<string>('col-6')
  constructor() {}

  setFilters(filter: FilterModel, path: string) {
    let userFilters = JSON.parse(localStorage.getItem('userFilters'));
    userFilters[path] = filter;
    localStorage.setItem('userFilters', JSON.stringify(userFilters));
    this.activeFilter.next(userFilters[path]);
  }

  getFilter(path: string) {
    let userFilters = JSON.parse(localStorage.getItem('userFilters')) || {};
    if (!userFilters[path]) {
      userFilters[path] = new FilterModel();
      localStorage.setItem('userFilters', JSON.stringify(userFilters));
    }
    this.activeFilter.next(userFilters[path]);
  }

  getMoviesElementsSize( path: string ) {
    let userSize = JSON.parse(localStorage.getItem('userMoviesListSize')) || {};
    if ( !userSize[path] ) {
      userSize[path] = 'col-6';
      localStorage.setItem('userMoviesListSize', JSON.stringify(userSize));
    }
    this.activeMoviesElementsSize.next(userSize[path]);
  }

  setMoviesElementsSize( size: string, path: string ) {
    let userSize = JSON.parse(localStorage.getItem('userMoviesListSize'));
    userSize[path] = size;
    localStorage.setItem('userMoviesListSize', JSON.stringify(userSize));
    this.activeMoviesElementsSize.next(userSize[path]);
  }

}
