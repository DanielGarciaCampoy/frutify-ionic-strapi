import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private _producto:Producto[] = [
    {
      id:1,
      name:"Naranjas",
      price:1,
      picture:"https://drive.google.com/uc?id=1qQVAcQkqgzZ5bA2SeenhTu739cxy0kGD"
    },
    {
      id:2,
      name:"Plátano",
      price:2.9,
      picture:"https://drive.google.com/uc?id=1g19m0jxLZk5pnE8jVB-5GaBZPKdYp6wm"
    },
    {
      id:3,
      name:"Sandía",
      price:1.70,
      picture:"https://drive.google.com/uc?id=1-9DWtgSf6lJScXe5zgz3u_913yg70ttA"
    },
    {
      id:4,
      name:"Limones",
      price:1.70,
      picture:"https://drive.google.com/uc?id=1nAQdfTr_IxNLQ58iWA92klkTR_lZPLY-"
    },
    {
      id:5,
      name:"Fresas",
      price:2.50,
      picture:"https://drive.google.com/uc?id=13ypBRHwa5XsW6-_dCK5dkwvoIqfQQhF5"
    },
    {
      id:6,
      name:"Manzanas",
      price: 2.50,
      picture:"https://drive.google.com/uc?id=1YFBlz8BAEJSVrlJun0MKEZiP__hVcz5e"
    },
    {
      id:7,
      name:"Uva",
      price:2.70,
      picture:"https://drive.google.com/uc?id=1H71KvRoPx_6tM64d-dc11bF6n6I-C9bV"
    },
  ];

  id:number = this._producto.length+1;
  constructor() { }

  getProductos(){
    return this._producto;
  }

  
  getProductoById(id:number){
    return this._producto.find(p=>p.id==id);
  }

  deleteProductoById(id:number){
    this._producto = this._producto.filter(p=>p.id != id);
  }

  addProducto(producto:Producto){
    producto.id = this.id++;
    this._producto.push(producto);
  }

  updateProducto(producto:Producto) {
    var _producto = this._producto.find(p=>p.id==producto.id);
    if (_producto){
      _producto.name = producto.name;
      _producto.price = producto.price;
      //_producto.picture = producto.picture;
    }
  }
  
}
