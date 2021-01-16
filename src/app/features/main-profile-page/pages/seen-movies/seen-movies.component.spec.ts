import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeenMoviesComponent } from './seen-movies.component';

describe('SeenMoviesComponent', () => {
  let component: SeenMoviesComponent;
  let fixture: ComponentFixture<SeenMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeenMoviesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeenMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
