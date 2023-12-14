import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmmHomeComponent } from './mmm-home.component';

describe('MmmHomeComponent', () => {
  let component: MmmHomeComponent;
  let fixture: ComponentFixture<MmmHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MmmHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MmmHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
