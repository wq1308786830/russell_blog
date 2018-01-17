import { TestBed, inject } from '@angular/core/testing';

import { GpuBirdsService } from './gpu-birds.service';

describe('GpuBirdsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GpuBirdsService]
    });
  });

  it('should be created', inject([GpuBirdsService], (service: GpuBirdsService) => {
    expect(service).toBeTruthy();
  }));
});
