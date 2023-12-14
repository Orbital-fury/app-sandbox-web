import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PCBuilderComponent } from './pc-builder.component';

describe('PCBuilderComponent', () => {
  let component: PCBuilderComponent;
  let fixture: ComponentFixture<PCBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PCBuilderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PCBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
