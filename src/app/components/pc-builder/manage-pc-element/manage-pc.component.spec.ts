import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePcComponent } from './manage-pc.component';

describe('ManagePcComponent', () => {
  let component: ManagePcComponent;
  let fixture: ComponentFixture<ManagePcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagePcComponent]
    });
    fixture = TestBed.createComponent(ManagePcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
