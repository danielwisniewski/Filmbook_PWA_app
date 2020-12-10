import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { firebase, firebaseui, FirebaseUIModule } from 'firebaseui-angular';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  hide = true;
  ui: firebaseui.auth.AuthUI;

  constructor(
    private afAuth: AngularFireAuth,
    private _snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const firebaseUiAuthConfig: firebaseui.auth.Config = {
      // signInFlow: 'popup',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        {
          requireDisplayName: false,
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        },
        firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccessWithAuthResult: this.onLoginSuccesful.bind(this),
      },
    };

    this.afAuth.app.then((app) => {
      this.ui = new firebaseui.auth.AuthUI(app.auth());
      this.ui.start('#firebaseui-auth-container', firebaseUiAuthConfig);
    });

  }

  onLoginSuccesful(result) {
    console.log(result)
  }

  ngOnDestroy() {
    this.ui.delete();
  }

  // onSubmit(form: NgForm) {
  //   this.firebase
  //     .signInWithEmailAndPassword(form.value.email, form.value.password)
  //     .then(
  //       (success) => {},
  //       (error) => {
  //         this._snackBar.open(error.message, 'Ok', {
  //           duration: 10000,
  //           verticalPosition: 'top',
  //         });
  //       }
  //     );
  //   form.reset();
  // }

  // logWithNoAccount() {
  //   this.firebase.signInAnonymously().then(
  //     (success) => {
  //       this.authService.userId.next(success.user.uid);
  //       this.router.navigate(['/movies']);
  //     },
  //     (error) => {
  //       this._snackBar.open(error.message, 'Ok', {
  //         duration: 10000,
  //         verticalPosition: 'top',
  //       });
  //     }
  //   );
  // }
}
