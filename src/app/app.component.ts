import { ApplicationRef, Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { concat, interval } from 'rxjs';
import { first } from 'rxjs/operators';
import { RouterLoggerService } from './core/services/router-logger.service';
import { AuthService } from './features/login-page/login-page.service';
import { MainProfilePageFacadeService } from './features/main-profile-page/main-profile-page-facade.service';
import { IconSantizerService } from './shared/services/icon-santizer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'MovieApp';

  constructor(
    private authSrevice: AuthService,
    private RouterLoggerService: RouterLoggerService,
    private iconSantizer: IconSantizerService,
    private profileService: MainProfilePageFacadeService,
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
}
