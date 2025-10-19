import { TestBed } from '@angular/core/testing';

import { Genkit } from './genkit';

describe('Genkit', () => {
  let service: Genkit;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Genkit);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
