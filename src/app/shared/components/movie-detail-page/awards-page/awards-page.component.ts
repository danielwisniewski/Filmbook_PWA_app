import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UIService } from 'src/app/shared/services/ui.service';
import { AwardsModel } from '../awards.model';

@Component({
  selector: 'app-awards-page',
  templateUrl: './awards-page.component.html',
  styleUrls: ['./awards-page.component.css'],
})
export class AwardsPageComponent implements OnInit, OnDestroy {
  awards: AwardsModel[];
  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private ui: UIService,
    public location: Location
  ) {}

  ngOnInit(): void {
    this.sub = this.route.data
      .pipe(map((val) => val.awards))
      .subscribe((val) => {
        this.ui.loading.next(false);
        this.awards = val;
      });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe()
    }
  }
}
