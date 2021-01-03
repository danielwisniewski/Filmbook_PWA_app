import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-in-list',
  templateUrl: './search-in-list.component.html',
  styleUrls: ['./search-in-list.component.css']
})
export class SearchInListComponent implements OnInit {
  title: string = '';
  @Output() public titleChanged = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

  onTitleChange(title:string) {
    this.titleChanged.emit(title);
  }

}
