import { TestBed } from '@angular/core/testing';

import { registerChampionService } from './registerChampion.service';

describe('registerChampionService', () => {
  let service: registerChampionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(registerChampionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
