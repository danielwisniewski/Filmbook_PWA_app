import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseViewBarComponent } from './choose-view-bar.component';

describe('ChooseViewBarComponent', () => {
  let component: ChooseViewBarComponent;
  let fixture: ComponentFixture<ChooseViewBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseViewBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseViewBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
