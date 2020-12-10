import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ProfileDetailBottomSheetComponent } from './profile-detail-bottom-sheet/profile-detail-bottom-sheet.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  title = "Mój profil"
  constructor(private _bottomSheet: MatBottomSheet) { }

  ngOnInit(): void { 
    
  }

  userImageClicked() {
    this._bottomSheet.open(ProfileDetailBottomSheetComponent)
  }

}
