import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementChoiceComponent } from './element-choice.component';

describe('ElementChoiceComponent', () => {
  let component: ElementChoiceComponent;
  let fixture: ComponentFixture<ElementChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementChoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
