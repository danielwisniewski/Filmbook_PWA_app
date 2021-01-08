import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { FilterModel } from 'src/app/shared/Models/filter.model';
import { FiltersService } from 'src/app/shared/services/filters.service';

@Component({
  selector: 'app-filter-bottom-sheet',
  templateUrl: './filter-bottom-sheet.component.html',
  styleUrls: ['./filter-bottom-sheet.component.css'],
})
export class FilterBottomSheetComponent implements OnInit {
  isProfile: boolean;
  filter: FilterModel;
  constructor(
    private router: Router,
    private _bottomSheet: MatBottomSheetRef<FilterBottomSheetComponent>,
    private filterService: FiltersService
  ) {}

  ngOnInit(): void {
    this.isProfile = this.router.url.includes('profile');
    this.filter = this.filterService.activeFilter.value;
  }

  onSaveButton() {
    this.filterService.setFilters(this.filter, this.router.url);
    this._bottomSheet.dismiss();
  }

}
