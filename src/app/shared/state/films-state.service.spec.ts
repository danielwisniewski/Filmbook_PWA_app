/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FilmsStateService } from './films-state.service';

describe('Service: FilmsState', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilmsStateService]
    });
  });

  it('should ...', inject([FilmsStateService], (service: FilmsStateService) => {
    expect(service).toBeTruthy();
  }));
});
