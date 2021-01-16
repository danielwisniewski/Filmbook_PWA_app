import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EveningSeanceElementComponent } from './evening-seance-element.component';

describe('MovieElementComponent', () => {
  let component: EveningSeanceElementComponent;
  let fixture: ComponentFixture<EveningSeanceElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EveningSeanceElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EveningSeanceElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
