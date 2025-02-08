import { TestBed } from '@angular/core/testing';

import { UserSignalsService } from './user-signals.service';

describe('UserSignalsService', () => {
  let service: UserSignalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSignalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
