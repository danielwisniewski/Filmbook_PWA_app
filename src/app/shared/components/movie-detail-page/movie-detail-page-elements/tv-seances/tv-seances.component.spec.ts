import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvSeancesComponent } from './tv-seances.component';

describe('TvSeancesComponent', () => {
  let component: TvSeancesComponent;
  let fixture: ComponentFixture<TvSeancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TvSeancesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TvSeancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
