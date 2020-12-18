import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AwardsModel } from '../awards.model';

@Component({
  selector: 'app-awards-page',
  templateUrl: './awards-page.component.html',
  styleUrls: ['./awards-page.component.css'],
})
export class AwardsPageComponent implements OnInit, OnDestroy {
  sub: Subscription;
  awards: AwardsModel[];
  title = 'Nagrody'
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.sub = this.route.data
      .pipe(map((val) => val.awards))
      .subscribe((val) => this.awards = val);
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
