import { TestBed } from '@angular/core/testing';

import { ElementChoiceService } from './element-choice.service';

describe('ElementChoiceService', () => {
  let service: ElementChoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElementChoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
