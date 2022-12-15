import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClientelaService {

  private _cliente:Cliente[] = [
    {
      id:1,
      name:"Juan Alberto",
      username:"illojuan",
      picture:"https://pbs.twimg.com/media/Ea9xEW7WAAMSnv2.jpg"
    },
    {
      id:2,
      name:"Kanye West",
      username:"Ye",
      picture:"https://media.wired.com/photos/63226fd374ce5b82a68ef212/master/w_2560%2Cc_limit/Kanye-West-Black-Skinhead-Excerpt-Culture-1205198865.jpg"
    },
    {
      id:3,
      name:"Elon Musk",
      username:"Elon",
      picture:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Elon_Musk_Colorado_2022_%28cropped%29.jpg/800px-Elon_Musk_Colorado_2022_%28cropped%29.jpg"
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
