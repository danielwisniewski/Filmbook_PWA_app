import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullCastPageComponent } from './full-cast-page.component';

describe('FullCastPageComponent', () => {
  let component: FullCastPageComponent;
  let fixture: ComponentFixture<FullCastPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullCastPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullCastPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
