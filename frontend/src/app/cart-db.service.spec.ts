import { TestBed } from '@angular/core/testing';

import { CartDBService } from './cart-db.service';

describe('CartDBService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartDBService = TestBed.get(CartDBService);
    expect(service).toBeTruthy();
  });
});
