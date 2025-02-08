import { TestBed } from '@angular/core/testing';

import { UserToSignalService } from './user-to-signal.service';

describe('UserWSignalService', () => {
  let service: UserToSignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserToSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
