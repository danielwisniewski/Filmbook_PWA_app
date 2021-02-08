import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-search-in-list',
  templateUrl: './search-in-list.component.html',
  styleUrls: ['./search-in-list.component.css'],
})
export class SearchInListComponent implements OnDestroy, AfterViewInit {
  @Input() moviesCounter: number;
  @Output() public titleChanged = new EventEmitter();
  @Output() public sortByTimeAddedChanged = new EventEmitter();
  @ViewChild('titleInput') titleInput: ElementRef;
  sortByTimeAdded: boolean;
  private sub: Subscription;

  ngAfterViewInit() {
    this.sub = fromEvent(this.titleInput.nativeElement, 'keyup')
      .pipe(
        map((e: any) => e.target.value.toLowerCase()),
        debounceTime(500)
      )
      .subscribe((val) => this.titleChanged.emit(val));
  }

  onSortIcon() {
    this.sortByTimeAdded = !this.sortByTimeAdded;
    this.sortByTimeAddedChanged.emit(this.sortByTimeAdded);
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
}
