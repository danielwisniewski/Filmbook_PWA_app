import { Injectable } from '@angular/core';
import {
  NavigationEnd,
  Router,
} from '@angular/router';
import { filter, pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RouterLoggerService {
  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        pluck('url')
      )
      .subscribe((url: string) => localStorage.setItem('lastUrl', url));
  }
}
