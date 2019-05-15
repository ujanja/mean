import { TestBed } from '@angular/core/testing';

import { LoginThenBetService } from './login-then-bet.service';

describe('LoginThenBetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginThenBetService = TestBed.get(LoginThenBetService);
    expect(service).toBeTruthy();
  });
});
