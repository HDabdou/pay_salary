import { TestBed, inject } from '@angular/core/testing';

import { PaySalaryService } from './pay-salary.service';

describe('PaySalaryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaySalaryService]
    });
  });

  it('should be created', inject([PaySalaryService], (service: PaySalaryService) => {
    expect(service).toBeTruthy();
  }));
});
