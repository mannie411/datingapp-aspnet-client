/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UnsavedGuardService } from './unsaved-guard.service';

describe('Service: UnsavedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnsavedGuardService]
    });
  });

  it('should ...', inject([UnsavedGuardService], (service: UnsavedGuardService) => {
    expect(service).toBeTruthy();
  }));
});
