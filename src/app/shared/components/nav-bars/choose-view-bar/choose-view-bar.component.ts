import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FilterBottomSheetComponent } from './filter-bottom-sheet/filter-bottom-sheet.component';

@Component({
  selector: 'app-choose-view-bar',
  templateUrl: './choose-view-bar.component.html',
  styleUrls: ['./choose-view-bar.component.css'],
})
export class ChooseViewBarComponent implements OnInit {
  @Output() private size = new EventEmitter<string>();
  @Input() moviesCounter: number = 0;
  constructor(
    private icon: MatIconRegistry,
    private santizer: DomSanitizer,
    private _bottomSheet: MatBottomSheet
  ) {}

  ngOnInit(): void {
    this.icon.addSvgIcon(
      'view_sidebar',
      this.santizer.bypassSecurityTrustResourceUrl(
        '../../../../assets/icons/view_sidebar-black-24dp.svg'
      )
    );
  }

  valueChanged(event) {
    this.size.emit(event.value);
  }

  onFilterButton() {
    this._bottomSheet.open(FilterBottomSheetComponent);
  }

}
