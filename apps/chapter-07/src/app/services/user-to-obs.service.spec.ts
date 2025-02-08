import { TestBed } from '@angular/core/testing';

import { UserToObsService } from './user-to-obs.service';

describe('UserToObsService', () => {
  let service: UserToObsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserToObsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
