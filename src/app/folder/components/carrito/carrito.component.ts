import { Component, OnInit } from '@angular/core';
import { Cliente, ClienteProductosService, ClientelaService, ProductosService } from 'src/app/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
})
export class CarritoComponent implements OnInit {

  constructor(
    private clientelaSvc:ClientelaService,
    private productosSvc:ProductosService,
    private clienteProductosSvc:ClienteProductosService
  ) { }

  ngOnInit() {}

  getClienteByClienteId(clienteId: number) {
    return this.clientelaSvc.getClienteById(clienteId);
  }

  getProductoByProductoId(productoId:number) {
    return this.productosSvc.getProductoById(productoId);
  }

  getProductoByClienteId(clienteId: number) {
    return this.productosSvc.getProductoByClienteId(clienteId);
  }

  getClientela() {
    return this.clientelaSvc.getClientela();
  }

  getProductos() {
    return this.productosSvc.getProductos();
  }

  getClienteProductosByClienteId(clienteId: number) {
    return this.clienteProductosSvc.getClienteProductosByClienteId(clienteId);
  }

}