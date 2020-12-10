import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InTvTodayComponent } from './in-tv-today.component';

describe('InTvTodayComponent', () => {
  let component: InTvTodayComponent;
  let fixture: ComponentFixture<InTvTodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InTvTodayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InTvTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
