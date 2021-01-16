import { Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UIService } from 'src/app/shared/services/ui.service';
import { CastModel } from './cast.model';

@Component({
  selector: 'app-full-cast-page',
  templateUrl: './full-cast-page.component.html',
  styleUrls: ['./full-cast-page.component.css'],
})
export class FullCastPageComponent implements OnInit, OnDestroy {
  sub: Subscription;
  cast: CastModel[];
  constructor(
    private route: ActivatedRoute,
    private ui: UIService,
    public location: Location
  ) {}

  ngOnInit(): void {
    this.sub = this.route.data.pipe(map((val) => val.cast)).subscribe((val) => {
      this.ui.loading.next(false);
      this.cast = val;
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
