import { TestBed } from '@angular/core/testing';

import { ResetPasswordValidatingGuard } from './reset-password-validating.guard';

describe('ResetPasswordValidatingGuard', () => {
  let guard: ResetPasswordValidatingGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ResetPasswordValidatingGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
