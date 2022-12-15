import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClientelaService {

  private _cliente:Cliente[] = [
    {
      id:1,
      name:"cliente1",
      username:"cliente1",
      picture:""
    },
    {
      id:2,
      name:"cliente2",
      username:"cliente2",
      picture:""
    }
  ];

  id:number = this._cliente.length+1;
  constructor() { }

  getClientela(){
    return this._cliente;
  }

  getClienteById(id:number){
    return this._cliente.find(p=>p.id==id);
  }

  deleteClienteById(id:number){
    this._cliente = this._cliente.filter(p=>p.id != id);
  }

  addCliente(cliente:Cliente){
    cliente.id = this.id++;
    this._cliente.push(cliente);
  }

  updateCliente(cliente:Cliente) {
    var _cliente = this._cliente.find(p=>p.id==cliente.id);
    if (_cliente){
      _cliente.name = cliente.name;
      _cliente.username = cliente.username;
    }
  }

}
