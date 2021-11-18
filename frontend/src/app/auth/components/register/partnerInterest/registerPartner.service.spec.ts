import { TestBed } from '@angular/core/testing';

import { registerPartnerService } from './registerPartner.service';

describe('registerPartnerService', () => {
  let service: registerPartnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(registerPartnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
