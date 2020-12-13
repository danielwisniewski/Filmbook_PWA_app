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
    this.isProfile = this.router.url.includes('profile') ? true : false;
    if ( this.isProfile ) {
      this.filter = this.filterService.profileFilters.value
    } else {
      this.filter = this.filterService.moviesFilters.value
    }
    const test = this.filterService.getFilter(this.router.url);
    console.log(test);
  }

  onSaveButton() {
    const document = this.isProfile ? 'profile' : 'movies';
    this.filterService.setFilters(this.filter, document);
    this._bottomSheet.dismiss();
  }
}
