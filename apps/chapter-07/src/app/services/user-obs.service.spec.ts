import { TestBed } from '@angular/core/testing';

import { UserObsService } from './user-obs.service';

describe('UserService', () => {
  let service: UserObsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserObsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
