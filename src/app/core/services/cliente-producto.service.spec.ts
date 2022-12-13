import { TestBed } from '@angular/core/testing';

import { ClienteProductosService } from './cliente-productos.service';

describe('ClienteProductoService', () => {
  let service: ClienteProductosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClienteProductosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
