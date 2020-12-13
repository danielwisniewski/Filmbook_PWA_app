import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { FiltersService } from '../shared/services/filters.service';
import { FirestoreMoviesService } from '../shared/services/firestore-movies.service';
import { UIService } from '../shared/services/ui.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userId = new BehaviorSubject<string>(null);
  userData = new BehaviorSubject<any>(null);
  authChange = new BehaviorSubject<boolean>(false);
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private moviesService: FirestoreMoviesService,
    private filterService: FiltersService
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.authChange.next(true);
        localStorage.setItem('userId', user.uid);
        this.userId.next(user.uid);
        this.userData.next(user);
        this.router.navigate(['/movies']);
        this.moviesService.initialFetch();
        this.filterService.fetchFilters();
      } else {
        this.moviesService.cancelSubscriptions();
        this.authChange.next(false);
        this.router.navigate(['/login']);
        localStorage.setItem('userId', null);
        this.userData.next(null);
        this.userId.next(null);
      }
    });
  }

  logout() {
    this.afAuth.signOut();
  }
}
