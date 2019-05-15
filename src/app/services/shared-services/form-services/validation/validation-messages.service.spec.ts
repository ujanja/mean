import { TestBed } from '@angular/core/testing';

import { ValidationMessagesService } from './validation-messages.service';

describe('ValidationMessagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidationMessagesService = TestBed.get(ValidationMessagesService);
    expect(service).toBeTruthy();
  });
});
