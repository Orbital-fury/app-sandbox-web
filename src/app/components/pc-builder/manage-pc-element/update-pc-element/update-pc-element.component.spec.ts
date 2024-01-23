import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePcElementComponent } from './update-pc-element.component';

describe('UpdatePcElementComponent', () => {
  let component: UpdatePcElementComponent;
  let fixture: ComponentFixture<UpdatePcElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePcElementComponent]
    });
    fixture = TestBed.createComponent(UpdatePcElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
