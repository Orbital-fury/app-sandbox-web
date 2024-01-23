import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePcElementComponent } from './manage-pc-element.component';

describe('ManagePcElementComponent', () => {
  let component: ManagePcElementComponent;
  let fixture: ComponentFixture<ManagePcElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagePcElementComponent]
    });
    fixture = TestBed.createComponent(ManagePcElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
