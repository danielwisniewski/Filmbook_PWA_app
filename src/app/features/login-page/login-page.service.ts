import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { RouterLoggerService } from 'src/app/core/services/router-logger.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userId = new BehaviorSubject<string>(null);
  userData = new BehaviorSubject<any>(null);
  authChange = new BehaviorSubject<boolean>(null);
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.authChange.next(true);
        localStorage.setItem('userId', user.uid);
        this.userId.next(user.uid);
        this.userData.next(user);
        if ( localStorage.getItem('lastUrl') && localStorage.getItem('lastUrl') !== '/login' ) {
          this.router.navigate([localStorage.getItem('lastUrl')])
        } else {
          this.router.navigate(['/movies']);
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
