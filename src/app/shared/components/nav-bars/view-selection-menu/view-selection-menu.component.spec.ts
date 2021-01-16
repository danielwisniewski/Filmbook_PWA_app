import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSelectionMenuComponent } from './view-selection-menu.component';

describe('ChooseViewBarComponent', () => {
  let component: ViewSelectionMenuComponent;
  let fixture: ComponentFixture<ViewSelectionMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSelectionMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSelectionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
