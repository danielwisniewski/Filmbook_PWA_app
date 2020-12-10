import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieMiniaturesListComponent } from './movie-miniatures-list.component';

describe('MovieMiniatureComponent', () => {
  let component: MovieMiniaturesListComponent;
  let fixture: ComponentFixture<MovieMiniaturesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieMiniaturesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieMiniaturesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
