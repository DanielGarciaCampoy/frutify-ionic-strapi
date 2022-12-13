import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClientelaService {

  private _cliente:Cliente[] = [
    {
      id:1,
      name:"Donald Trump",
      username:"Trump",
      picture:"data:image/jpeg;base64,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"
    },
    {
      id:2,
      name:"Barack Obama",
      username:"Obama",
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
