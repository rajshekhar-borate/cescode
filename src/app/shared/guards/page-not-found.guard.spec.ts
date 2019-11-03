import { TestBed, async, inject } from '@angular/core/testing';

import { PageNotFoundGuard } from './page-not-found.guard';

describe('PageNotFoundGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageNotFoundGuard]
    });
  });

  it('should ...', inject([PageNotFoundGuard], (guard: PageNotFoundGuard) => {
    expect(guard).toBeTruthy();
  }));
});
