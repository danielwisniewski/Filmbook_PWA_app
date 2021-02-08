import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UIService {
  loading = new Subject<boolean>()
  lastIndex = new BehaviorSubject<string>('')
  constructor(private _snackBar: MatSnackBar) { }


  showBottomSnackbar(text: string ) {
    this._snackBar.open(text, 'Ok', {
      duration: 3000,
      verticalPosition: 'bottom',
    });
  }

  showTopSnackbar(text: string ) {
    this._snackBar.open(text, 'Ok', {
      duration: 3000,
      verticalPosition: 'top',
    });
  }

}
