import { TestBed } from '@angular/core/testing';

import { ElementTypeChoiceService } from './element-type-choice.service';

describe('ElementTypeChoiceService', () => {
  let service: ElementTypeChoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElementTypeChoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
