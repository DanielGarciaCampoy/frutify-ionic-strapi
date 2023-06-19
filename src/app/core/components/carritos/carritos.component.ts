import { Component, Input, OnInit } from '@angular/core';
import { ClienteProductosService, ClientelaService, ProductosService } from '../../services';
import { Cliente, Producto } from '../../models';
import { error } from 'console';
import { resolve } from 'dns';
import { rejects } from 'assert';

@Component({
  selector: 'app-carritos',
  templateUrl: './carritos.component.html',
  styleUrls: ['./carritos.component.scss'],
})
export class CarritosComponent implements OnInit {

  // @Input() cliente:Cliente
  // @Input() producto:Producto
  //producto: Producto;

  clientes: Cliente[];
  productosPorCliente: { [key: number]: Producto[] } = {};

  constructor(
    private clientelaSvc:ClientelaService,
    private productosSvc:ProductosService,
    private clienteProductosSvc:ClienteProductosService
  ) { }

  async ngOnInit() {
    /*try {
      this.clientes = await this.clientelaSvc.getClientela();
      await Promise.all(this.clientes.map(cliente => this.getProductosByClienteId(cliente.id)));
    } catch (error) {
      console.error(error);
    }*/
  }

  getClienteByClienteId(clienteId: number) {
    return this.clientelaSvc.getClienteById(clienteId);
  }

  /*getProductoByProductoId(productoId:number) {
    return this.productosSvc.getProductoById(productoId);
  }*/

  getClientela() {
    return this.clientelaSvc.getClientela();
  }

  async getProductosByClienteId(clienteId: number) {
    // return this.clienteProductosSvc.getProductosByClienteId(clienteId);
    try {
      const productos = await this.clienteProductosSvc.getProductosByClienteId(clienteId);
      console.log('Productos:', productos);
      this.productosPorCliente[clienteId] = productos;
    } catch (error) {
      console.error(error);
    }
  }

  /*async cargarClientes() {
    try {
      const clientes = await this.clientelaSvc.getClientela();
      clientes.forEach((cliente) => {
        this.productosPorCliente[cliente.id] = [];
      });
      await this.cargarProductosPorCliente();
    } catch (error) {
      console.error('Error al cargar los clientes:', error);
    }
  }*/

  /*getProductos() {
    return this.productosSvc.getProductos();
  }*/

  /*getClienteProductosByClienteId(clienteId: number) {
    return this.clienteProductosSvc.getClienteProductosByClienteId(clienteId);
  }*/

  // 
  /*productosPorCliente: { [clienteId: number]: Producto[] } = {};

  async cargarProductosPorCliente() {
    const clientes = await this.getClientela();
    const promises = clientes.map((cliente) => {
      return this.getProductosByClienteId(cliente.id);
    });
    const productosPorCliente = await Promise.all(promises);

    clientes.forEach((cliente, index) => {
      this.productosPorCliente[cliente.id] = productosPorCliente[index];
    });

    console.log(this.productosPorCliente);
  }

  getProductosPorCliente(clienteId: number): Producto[] {
    return this.productosPorCliente[clienteId] || [];
  }*/

}
