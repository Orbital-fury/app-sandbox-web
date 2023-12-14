import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmmMenuComponent } from './mmm-menu.component';

describe('MmmMenuComponent', () => {
  let component: MmmMenuComponent;
  let fixture: ComponentFixture<MmmMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MmmMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MmmMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
