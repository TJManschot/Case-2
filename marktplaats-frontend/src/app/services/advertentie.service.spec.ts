import {TestBed} from '@angular/core/testing';

import {AdvertentieService} from './advertentie.service';

describe('AdvertentieService', () => {
  let service: AdvertentieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvertentieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
