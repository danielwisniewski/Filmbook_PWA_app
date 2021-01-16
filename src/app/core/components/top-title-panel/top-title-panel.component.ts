import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/features/login-page/login-page.service';

@Component({
  selector: 'app-top-title-panel',
  templateUrl: './top-title-panel.component.html',
  styleUrls: ['./top-title-panel.component.css'],
})
export class TopTitlePanelComponent implements OnInit {
  @Input() showUserPicture: boolean = false;
  @Output() private userImageClicked = new EventEmitter();
  userPicture: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.userData.value?.photoURL != null) {
      this.userPicture = this.authService.userData.value.photoURL;
    } else {
      this.userPicture = '../../../../assets/images/guest.png';
    }
  }

  onUserImage() {
    this.userImageClicked.emit();
  }
}
