import { TestBed } from '@angular/core/testing';

import { SituationDataService } from './situation-data.service';

describe('SituationDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SituationDataService = TestBed.get(SituationDataService);
    expect(service).toBeTruthy();
  });
});
