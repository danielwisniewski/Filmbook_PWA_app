import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomTabsMenuComponent } from './bottom-tabs-menu.component';

describe('BottomBarComponent', () => {
  let component: BottomTabsMenuComponent;
  let fixture: ComponentFixture<BottomTabsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BottomTabsMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomTabsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
