import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ProfileDetailBottomSheetComponent } from './components/profile-detail-bottom-sheet/profile-detail-bottom-sheet.component';


@Component({
  selector: 'app-profile',
  templateUrl: './main-profile-page.component.html',
  styleUrls: ['./main-profile-page.component.css']
})
export class MainProfilePageComponent implements OnInit {
  constructor(private _bottomSheet: MatBottomSheet) { }

  ngOnInit(): void { 
  }

  userImageClicked() {
    this._bottomSheet.open(ProfileDetailBottomSheetComponent, {
      panelClass: 'nav__filter-bottom-sheet'
    })
  }

}
