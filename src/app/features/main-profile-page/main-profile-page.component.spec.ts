import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainProfilePageComponent } from './main-profile-page.component';

describe('ProfileComponent', () => {
  let component: MainProfilePageComponent;
  let fixture: ComponentFixture<MainProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainProfilePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
