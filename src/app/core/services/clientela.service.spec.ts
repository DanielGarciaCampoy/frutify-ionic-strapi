import { TestBed } from '@angular/core/testing';

import { ClientelaService } from './clientela.service';

describe('ClientelaService', () => {
  let service: ClientelaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientelaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
