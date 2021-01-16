import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EveningTvSeancesComponent } from './evening-tv-seances.component';

describe('EveningSeancesComponent', () => {
  let component: EveningTvSeancesComponent;
  let fixture: ComponentFixture<EveningTvSeancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EveningTvSeancesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EveningTvSeancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
