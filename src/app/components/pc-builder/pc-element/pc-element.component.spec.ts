import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcElementComponent } from './pc-element.component';

describe('PcElementComponent', () => {
  let component: PcElementComponent;
  let fixture: ComponentFixture<PcElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PcElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
