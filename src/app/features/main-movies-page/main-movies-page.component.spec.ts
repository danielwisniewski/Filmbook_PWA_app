import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMoviesPageComponent } from './main-movies-page.component';

describe('MoviesComponent', () => {
  let component: MainMoviesPageComponent;
  let fixture: ComponentFixture<MainMoviesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainMoviesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMoviesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
