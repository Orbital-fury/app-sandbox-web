import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EuroCurrencyPipe } from './euro-currency-pipe.component';

describe('EuroCurrencyPipe', () => {
  let component: EuroCurrencyPipe;
  let fixture: ComponentFixture<EuroCurrencyPipe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EuroCurrencyPipe ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EuroCurrencyPipe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
