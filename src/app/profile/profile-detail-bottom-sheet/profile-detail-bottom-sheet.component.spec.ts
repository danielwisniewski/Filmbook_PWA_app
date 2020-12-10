import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDetailBottomSheetComponent } from './profile-detail-bottom-sheet.component';

describe('ProfileDetailBottomSheetComponent', () => {
  let component: ProfileDetailBottomSheetComponent;
  let fixture: ComponentFixture<ProfileDetailBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileDetailBottomSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDetailBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
