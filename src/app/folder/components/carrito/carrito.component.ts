import { Component, OnInit } from '@angular/core';
import { Cliente, ClientelaService, ProductosService } from 'src/app/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
})
export class CarritoComponent implements OnInit {

  constructor(
    private clientelaSvc:ClientelaService,
    private productosSvc:ProductosService
  ) { }

  ngOnInit() {}

  getClienteByClienteId(clienteId: number) {
    return this.clientelaSvc.getClienteById(clienteId);
  }

  getProductoByProductoId(productoId:number) {
    return this.productosSvc.getProductoById(productoId);
  }

  getClientela() {
    return this.clientelaSvc.getClientela();
  }

}