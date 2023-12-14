import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementTypeChoiceComponent } from './element-type-choice.component';

describe('ElementTypeChoiceComponent', () => {
  let component: ElementTypeChoiceComponent;
  let fixture: ComponentFixture<ElementTypeChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementTypeChoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementTypeChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
