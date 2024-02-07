import { TestBed } from '@angular/core/testing';

import { StatService } from './stat.service';

describe('StatServiceService', () => {
  let service: StatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
