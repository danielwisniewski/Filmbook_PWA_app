import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IgnoreMoviesListComponent } from './ignore-movies-list.component';

describe('IgnoreMoviesListComponent', () => {
  let component: IgnoreMoviesListComponent;
  let fixture: ComponentFixture<IgnoreMoviesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IgnoreMoviesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IgnoreMoviesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
