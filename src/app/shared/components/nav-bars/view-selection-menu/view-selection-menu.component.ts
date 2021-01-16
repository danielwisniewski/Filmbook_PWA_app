import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FiltersService } from 'src/app/shared/services/filters.service';
import { FilterBottomSheetComponent } from '../../filter-bottom-sheet/filter-bottom-sheet.component';

@Component({
  selector: 'app-view-selection-menu',
  templateUrl: './view-selection-menu.component.html',
  styleUrls: ['./view-selection-menu.component.css'],
})
export class ViewSelectionMenuComponent implements OnInit, OnDestroy {
  moviesCounter: Number;
  subs: Subscription[] = [];
  activeFilter: string;
  size: string;
  constructor(
    private _bottomSheet: MatBottomSheet,
    private router: Router,
    private filterService: FiltersService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.filterService.getFilter(this.router.url);
    this.filterService.getMoviesElementsSize(this.router.url);
    this.subs.push(
      this.filterService.elementCounter.subscribe((val) => {
        this.moviesCounter = val;
        this.changeDetector.detectChanges();
      })
    );
    this.subs.push(
      this.filterService.activeMoviesElementsSize.subscribe(
        (val) => (this.size = val)
      )
    );
  }

  valueChanged(event) {
    this.filterService.setMoviesElementsSize(event.value, this.router.url)
  }

  onFilterButton() {
    this._bottomSheet.open(FilterBottomSheetComponent, {
      panelClass: 'nav__filter-bottom-sheet'
    });
  }

  ngOnDestroy() {
    if (this.subs.length > 0) {
      this.subs.forEach((sub) => sub.unsubscribe());
    }
  }
}
