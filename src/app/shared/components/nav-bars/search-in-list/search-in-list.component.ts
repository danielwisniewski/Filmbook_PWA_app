import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { fromEvent } from 'rxjs';
import { debounceTime, filter, map, tap } from 'rxjs/operators';
import { MovieMiniatureListService } from '../../movie-miniatures-list/movie-miniature-list.service';

@Component({
  selector: 'app-search-in-list',
  templateUrl: './search-in-list.component.html',
  styleUrls: ['./search-in-list.component.css'],
})
export class SearchInListComponent implements OnDestroy, AfterViewInit {
  title: string = '';
  moviesCounter: number;
  sortByTimeAdded : boolean;
  subs: Subscription[] = [];
  @Output() public titleChanged = new EventEmitter();
  @Output() public sortByTimeAddedChanged = new EventEmitter();
  @ViewChild('titleInput') titleInput: ElementRef;
  constructor(private movieMiniatures: MovieMiniatureListService) {}

  ngAfterViewInit() {
    this.subs.push(
      fromEvent(this.titleInput.nativeElement, 'keyup')
        .pipe(
          map((e: any) => e.target.value.toLowerCase()),
          debounceTime(500),
        )
        .subscribe((val) => this.titleChanged.emit(val))
    );

    this.subs.push(
      this.movieMiniatures.currentList$
        .pipe(filter((val) => val !== null))
        .subscribe((result) => (this.moviesCounter = result.length))
    );
  }

  onSortIcon() {
    this.sortByTimeAdded = !this.sortByTimeAdded;
    this.sortByTimeAddedChanged.emit(this.sortByTimeAdded);
  }

  ngOnDestroy() {
    if (this.subs.length > 0) {
      this.subs.forEach((sub) => sub.unsubscribe());
    }
  }
}
