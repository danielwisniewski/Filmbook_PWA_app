import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userId = new BehaviorSubject<string>(null);
  userData = new BehaviorSubject<any>(null);
  authChange = new BehaviorSubject<boolean>(null);
  redirectUrl: string;
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  initAuthListener() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.authChange.next(true);
        localStorage.setItem('userId', user.uid);
        this.userId.next(user.uid);
        this.userData.next(user);
        
        if ( this.redirectUrl ) {
          this.router.navigateByUrl(this.redirectUrl)
        } else {
          this.router.navigate(['/movies'])
        }

      } else {
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
