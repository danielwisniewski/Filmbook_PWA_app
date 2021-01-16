import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopTitlePanelComponent } from './top-title-panel.component';

describe('TopBarComponent', () => {
  let component: TopTitlePanelComponent;
  let fixture: ComponentFixture<TopTitlePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopTitlePanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopTitlePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
