import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePcBuilderComponent } from './manage-pc-builder.component';

describe('ManagePcBuilderComponent', () => {
  let component: ManagePcBuilderComponent;
  let fixture: ComponentFixture<ManagePcBuilderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagePcBuilderComponent]
    });
    fixture = TestBed.createComponent(ManagePcBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
