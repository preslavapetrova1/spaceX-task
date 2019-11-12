import { TestBed } from '@angular/core/testing';

import { RocketService } from './rocket.service';

describe('RocketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RocketService = TestBed.get(RocketService);
    expect(service).toBeTruthy();
  });
});
