import { Component, Input, OnInit } from '@angular/core';
import { Cliente, ClienteProductoModel, Producto } from '../../models';
import { ClienteProductosService, ClientelaService, ProductosService } from '../../services';
import { LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-cliente-producto-calendario',
  templateUrl: './cliente-producto-calendario.component.html',
  styleUrls: ['./cliente-producto-calendario.component.scss'],
})
export class ClienteProductoCalendarioComponent implements OnInit {

  @Input() clienteProducto: ClienteProductoModel;
  constructor(
    private clientelaSvc: ClientelaService,
    private productosSvc: ProductosService,
    private clienteProductosSvc: ClienteProductosService,
    public locale: LocaleService
  ) { }

  ngOnInit() {}

  getProducto():Promise<Producto>{
    return this.productosSvc.getProductoById(this.clienteProducto.productoId);
}

  getCliente():Promise<Cliente>{
      return this.clientelaSvc.getClienteById(this.clienteProducto.clienteId);
  }

}
