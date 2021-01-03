import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInListComponent } from './search-in-list.component';

describe('SearchInListComponent', () => {
  let component: SearchInListComponent;
  let fixture: ComponentFixture<SearchInListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchInListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
