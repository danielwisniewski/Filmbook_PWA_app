import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FilterModel } from '../Models/filter.model';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  activeFilter = new BehaviorSubject<FilterModel>(null);
  elementCounter = new BehaviorSubject<Number>(0);
  activeMoviesElementsSize = new BehaviorSubject<string>('col-6')
  constructor() {}

  setFilters(filter: FilterModel, path: string) {
    let userFIlters = JSON.parse(localStorage.getItem('userFilters'));
    userFIlters[path] = filter;
    localStorage.setItem('userFilters', JSON.stringify(userFIlters));
    this.activeFilter.next(userFIlters[path]);
  }

  getFilter(path: string) {
    let userFIlters = JSON.parse(localStorage.getItem('userFilters')) || {};
    if (!userFIlters[path]) {
      userFIlters[path] = new FilterModel();
      localStorage.setItem('userFilters', JSON.stringify(userFIlters));
    }
    this.activeFilter.next(userFIlters[path]);
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
