import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent implements OnInit {
  @Input() title: string;
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
