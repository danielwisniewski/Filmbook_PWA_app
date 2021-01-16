import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { first, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../../features/login-page/login-page.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate():
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable< boolean | UrlTree> 
    {
      return this.authService.authChange.pipe(
        first( val => val !== null),
        map( user => {
          const isAuth = !!user;
          if ( isAuth ) {
            return true
          } else {
            return this.router.createUrlTree(['/login'])
          }
        } )
      )
    }
    
    canLoad():
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable< boolean | UrlTree> 
    {
      return this.authService.authChange.pipe(
        first( val => val !== null),
        map( user => {
          const isAuth = !!user;
          if ( isAuth ) {
            return true
          } else {
            return this.router.createUrlTree(['/login'])
          }
        } )
      )
    }
  }
