import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { firebase, firebaseui } from 'firebaseui-angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  hide = true;
  ui: firebaseui.auth.AuthUI;
  isLoading: boolean;
  sub: Subscription;

  constructor(
    private afAuth: AngularFireAuth,
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    const firebaseUiAuthConfig: firebaseui.auth.Config = {
      signInFlow: 'popup',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        {
          requireDisplayName: false,
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        },
        firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
      ],
    };

    this.sub = this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.isLoading = true;
      } else {
        this.isLoading = false;
        this.afAuth.app.then((app) => {
          this.ui = new firebaseui.auth.AuthUI(app.auth());
          this.ui.start('#firebaseui-auth-container', firebaseUiAuthConfig);
        });
      }
    });
  }

  ngOnDestroy() {
    if (this.ui) {
      this.ui.delete();
    }
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
