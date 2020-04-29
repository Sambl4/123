import { TestBed, inject } from '@angular/core/testing';

import { AuthorizationService } from './authorization.service';

describe('AuthorizationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthorizationService]
    });
  });

  it('should return islogged status', inject([AuthorizationService], (service: AuthorizationService) => {
    let result: boolean;

    result = service.getIsLogged();

    expect(result).toBeFalsy();
  }));
});
