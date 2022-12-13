import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ClienteProductoModel, Producto, Cliente } from '../../models';
import { IonItemSliding } from '@ionic/angular';
import { ClienteProductosService, ClientelaService, ProductosService } from '../../services';

@Component({
  selector: 'app-cliente-producto',
  templateUrl: './cliente-producto.component.html',
  styleUrls: ['./cliente-producto.component.scss'],
})
export class ClienteProductoComponent implements OnInit {

  @Output() onEdit = new EventEmitter;
  @Output() onDelete = new EventEmitter;
  @Input() clienteProducto:ClienteProductoModel;
  //
  constructor(
    private clientesSvc:ClientelaService,
    private productosSvc:ProductosService,
    private clienteProductosSvc:ClienteProductosService
  ) { }

  ngOnInit() {}

  getProducto():Producto {
    var productoId = this.clienteProducto.productoId;
    if (productoId)
      return (this.productosSvc.getProductoById(productoId))!;
    return undefined!;
  }

  getCliente():Cliente{
    var clienteId = this.clienteProducto.clienteId;
    if(clienteId)
      return (this.clientesSvc.getClienteById(clienteId))!;
    return undefined!;
  }

  onEditClick(){
    //slide.close();
    this.onEdit.emit(this.clienteProducto);
  }

  onDeleteClick(){
    //slide.close();
    this.onDelete.emit(this.clienteProducto);
  }

}
