import { TestBed } from '@angular/core/testing';

import { RegisterPartnerService } from './registerPartner.service';

describe('RegisterPartnerService', () => {
  let service: RegisterPartnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterPartnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
