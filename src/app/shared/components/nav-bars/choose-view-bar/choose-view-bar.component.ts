import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FiltersService } from 'src/app/shared/services/filters.service';
import { FilterBottomSheetComponent } from './filter-bottom-sheet/filter-bottom-sheet.component';

@Component({
  selector: 'app-choose-view-bar',
  templateUrl: './choose-view-bar.component.html',
  styleUrls: ['./choose-view-bar.component.css'],
})
export class ChooseViewBarComponent implements OnInit, OnDestroy {
  moviesCounter: Number;
  subs: Subscription[] = [];
  activeFilter: string;
  size: string;
  constructor(
    private icon: MatIconRegistry,
    private santizer: DomSanitizer,
    private _bottomSheet: MatBottomSheet,
    private router: Router,
    private filterService: FiltersService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.icon.addSvgIcon(
      'view_sidebar',
      this.santizer.bypassSecurityTrustResourceUrl(
        '../../../../assets/icons/view_sidebar-black-24dp.svg'
      )
    );
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
    if (this.subs != []) {
      this.subs.forEach((sub) => sub.unsubscribe());
    }
  }
}
