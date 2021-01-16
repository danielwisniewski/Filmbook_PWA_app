import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopTvSeancesComponent } from './top-tv-seances.component';

describe('InTvTodayComponent', () => {
  let component: TopTvSeancesComponent;
  let fixture: ComponentFixture<TopTvSeancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopTvSeancesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopTvSeancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
