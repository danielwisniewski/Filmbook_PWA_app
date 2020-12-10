import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieExpandableElementComponent } from './movie-expandable-element.component';

describe('MovieElementComponent', () => {
  let component: MovieExpandableElementComponent;
  let fixture: ComponentFixture<MovieExpandableElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieExpandableElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieExpandableElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
