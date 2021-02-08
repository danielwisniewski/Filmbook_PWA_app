import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FiltersService } from 'src/app/shared/services/filters.service';
import { FilterBottomSheetComponent } from '../../filter-bottom-sheet/filter-bottom-sheet.component';

@Component({
  selector: 'app-view-selection-menu',
  templateUrl: './view-selection-menu.component.html',
  styleUrls: ['./view-selection-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewSelectionMenuComponent implements OnInit {
  @Input() moviesCounter: Number;
  @Input() isFilterAvailable : boolean = true;
  size: Observable<string> = this.filterService.activeMoviesElementsSize.asObservable()
  constructor(
    private _bottomSheet: MatBottomSheet,
    private router: Router,
    private filterService: FiltersService,
  ) {}

  ngOnInit(): void {
    this.filterService.getFilter(this.router.url);
    this.filterService.getMoviesElementsSize(this.router.url);
  }

  valueChanged(event) {
    this.filterService.setMoviesElementsSize(event.value, this.router.url)
  }

  onFilterButton() {
    this._bottomSheet.open(FilterBottomSheetComponent, {
      panelClass: 'nav__filter-bottom-sheet'
    });
  }

}
