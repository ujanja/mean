import { TestBed } from '@angular/core/testing';

import { LoginNRegistrationService } from './login-n-registration.service';

describe('LoginNRegistrationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginNRegistrationService = TestBed.get(LoginNRegistrationService);
    expect(service).toBeTruthy();
  });
});
