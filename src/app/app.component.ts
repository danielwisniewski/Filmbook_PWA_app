import { ApplicationRef, Component, OnDestroy, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { concat, interval } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { FirestoreMoviesService } from './shared/services/firestore-movies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'MovieApp';

  constructor(
    private authSrevice: AuthService,
    private db: FirestoreMoviesService,
    public updates: SwUpdate,
    public appRef: ApplicationRef
  ) {
    const appIsStable$ = appRef.isStable.pipe(first(isStable => isStable === true));
    const everySixHours$ = interval(6 * 60 * 60 * 1000);
    const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);

    everySixHoursOnceAppIsStable$.subscribe(() => updates.checkForUpdate());
  }

  ngOnInit() {
    this.authSrevice.initAuthListener();
    this.updates.available.subscribe(
      (event) => {
        localStorage.setItem("version", JSON.stringify(event.current.appData["version"]))
        this.updates.activateUpdate().then( () => document.location.reload() )
      }
    )
    this.updates.activated.subscribe(
      event => {
        localStorage.setItem("version", JSON.stringify(event.current.appData["version"]))
      }
    )
  }

  ngOnDestroy() {
    this.db.cancelSubscriptions();
  }
}
