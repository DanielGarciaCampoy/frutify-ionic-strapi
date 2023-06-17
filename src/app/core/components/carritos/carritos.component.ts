import { Component, Input, OnInit } from '@angular/core';
import { ClienteProductosService, ClientelaService, ProductosService } from '../../services';
import { Cliente, Producto } from '../../models';

@Component({
  selector: 'app-carritos',
  templateUrl: './carritos.component.html',
  styleUrls: ['./carritos.component.scss'],
})
export class CarritosComponent implements OnInit {

  // @Input() cliente:Cliente
  // @Input() producto:Producto
  producto: Producto;
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
    return this.clienteProductosSvc.getProductoByClienteId(clienteId);
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
