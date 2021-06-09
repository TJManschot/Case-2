import { TestBed } from '@angular/core/testing';

import { InlogService } from './inlog.service';

describe('InlogService', () => {
  let service: InlogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InlogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
