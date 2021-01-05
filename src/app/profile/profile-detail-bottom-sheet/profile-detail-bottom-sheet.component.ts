import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-profile-detail-bottom-sheet',
  templateUrl: './profile-detail-bottom-sheet.component.html',
  styleUrls: ['./profile-detail-bottom-sheet.component.css']
})
export class ProfileDetailBottomSheetComponent implements OnInit {
  userData: {
    displayName:string,
    email: string,
    emailVerified: boolean,
    isAnonymous: boolean,
    photoURL: string,
    uid: string,
  }
  version: string;
  updateAvailable: boolean;
  constructor(private authService: AuthService, public _bottomSheetRef: MatBottomSheetRef<ProfileDetailBottomSheetComponent>) { }

  ngOnInit(): void {
    this.version = JSON.parse(localStorage.getItem("version")).current.appData.version;
    this.updateAvailable = JSON.parse(localStorage.getItem("version")).type === "UPDATE_AVAILABLE" ? true : false;
    this.userData = this.authService.userData.value;
  }

  onUpdate() {
    document.location.reload();
  }

  onLogout() {
    this.authService.logout();
    this._bottomSheetRef.dismiss()
  }

}
