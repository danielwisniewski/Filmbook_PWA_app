import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EveningSeancesComponent } from './evening-seances.component';

describe('EveningSeancesComponent', () => {
  let component: EveningSeancesComponent;
  let fixture: ComponentFixture<EveningSeancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EveningSeancesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EveningSeancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
