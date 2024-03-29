import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ClienteProductoModel, Producto, Cliente } from '../../models';
import { IonItemSliding } from '@ionic/angular';
import { ClienteProductosService, ClientelaService, ProductosService } from '../../services';
import { ClienteDetailComponent } from '../cliente-detail/cliente-detail.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-cliente-producto',
  templateUrl: './cliente-producto.component.html',
  styleUrls: ['./cliente-producto.component.scss'],
})
export class ClienteProductoComponent implements OnInit {

  @Output() onEdit = new EventEmitter;
  @Output() onDelete = new EventEmitter;
  @Input('clienteProducto') set clienteProducto(cP:ClienteProductoModel) {
    this._clienteProducto = cP;
    this.loadClienteAndProducto(cP);
  }

  private async loadClienteAndProducto(cP:ClienteProductoModel){
    this._producto.next(await this.productosSvc.getProductoById(cP.productoId));
    this._cliente.next(await this.clientelaSvc.getClienteById(cP.clienteId));
  }

  getClienteProducto():ClienteProductoModel {
    return this._clienteProducto;
  }

  getFecha(): string {
    if (this._clienteProducto && this._clienteProducto.createdAt) {
      let createdAt = this._clienteProducto.createdAt;
      if (typeof createdAt === 'string') {
        createdAt = new Date(createdAt);
      }
      const formattedDate = createdAt.toISOString().split('T')[0];
      return formattedDate;
    }
    return '';
  }

  private _clienteProducto:ClienteProductoModel;

  private _producto:BehaviorSubject<Producto> = new BehaviorSubject<Producto>(null); // null
  private _cliente:BehaviorSubject<Cliente> = new BehaviorSubject<Cliente>(null); // null
  producto$:Observable<Producto> = this._producto.asObservable();
  cliente$:Observable<Cliente> = this._cliente.asObservable();

  constructor(
    private clientelaSvc:ClientelaService,
    private productosSvc:ProductosService,
    public locale:LocaleService
  ) { }

  ngOnInit() {}

  /*
  getProducto():Producto {
    var productoId = this.clienteProducto.productoId;
    if (productoId)
      return (this.productosSvc.getProductoById(productoId))!;
    return undefined!;
  }

  getCliente():Cliente{
    var clienteId = this.clienteProducto.clienteId;
    if(clienteId)
      return (this.clientelaSvc.getClienteById(clienteId))!;
    return undefined!;
  }
  */

  onEditClick(){
    //slide.close();
    this.onEdit.emit(this._clienteProducto);
  }

  onDeleteClick(){
    //slide.close();
    this.onDelete.emit(this._clienteProducto);
  }

}