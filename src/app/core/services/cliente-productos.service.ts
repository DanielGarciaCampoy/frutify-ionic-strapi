import { Injectable } from '@angular/core';
import { ClienteProductoModel } from '../models/cliente-producto.model';
import * as moment from 'moment-timezone';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteProductosService {

  momentjs:any = moment;
  private _clienteProductos:ClienteProductoModel[] = [
    {
      id:1,
      clienteId:1,
      productoId:1,
      fechaCompra:moment().toISOString()
    },
    {
      id:3,
      clienteId:2,
      productoId:7,
      fechaCompra:moment().toISOString()
    },
    {
      id:2,
      clienteId:1,
      productoId:4,
      fechaCompra:moment().toISOString()
    },
    {
      id:2,
      clienteId:1,
      productoId:6,
      fechaCompra:moment().toISOString()
    }
  ];

  private _clienteProductosSubject:BehaviorSubject<ClienteProductoModel[]> = new BehaviorSubject(this._clienteProductos);
  public clienteProductos$ = this._clienteProductosSubject.asObservable();

  id:number = this._clienteProductos.length+1;
  constructor() { }

  getClienteProductos(){
    
    return this._clienteProductos;
  }

  getClienteProductoById(id:number){
    return this._clienteProductos.find(a=>a.id==id);
  }

  getClienteProductosByClienteId(clienteId:number):ClienteProductoModel[]{
    return this._clienteProductos.filter(a=>a.clienteId == clienteId);
  }

  getClienteProductosByProductoId(productoId:number):ClienteProductoModel[]{
    return this._clienteProductos.filter(a=>a.productoId == productoId);
  }

  deleteClienteProductoById(id:number){
    this._clienteProductos = this._clienteProductos.filter(a=>a.id != id); 
    this._clienteProductosSubject.next(this._clienteProductos);
  }

  addClienteProducto(clienteProducto:ClienteProductoModel){
    clienteProducto.id = this.id++;
    this._clienteProductos.push(clienteProducto);
    this._clienteProductosSubject.next(this._clienteProductos);
  }

  updateClienteProducto(clienteProducto:ClienteProductoModel){
    var _clienteProducto = this._clienteProductos.find(a=>a.id==clienteProducto.id);
    if(_clienteProducto){
      _clienteProducto.clienteId = clienteProducto.clienteId;
      _clienteProducto.productoId = clienteProducto.productoId;
      _clienteProducto.fechaCompra = clienteProducto.fechaCompra;
    }
    this._clienteProductosSubject.next(this._clienteProductos);
    
  }

}
