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
      picture:"https://cdn.pixabay.com/photo/2016/02/25/17/08/fruit-1222488_960_720.png"
    },
    {
      id:2,
      name:"Plátano",
      price:2.9,
      picture:"https://cdn.pixabay.com/photo/2016/02/23/17/29/banana-1218133_960_720.png"
    },
    {
      id:3,
      name:"Sandía",
      price:1.70,
      picture:"https://www.pngmart.com/files/8/Watermelon-PNG-Transparent-Image.png"
    },
    {
      id:4,
      name:"Limones",
      price:1.70,
      picture:"https://static.vecteezy.com/system/resources/previews/008/848/363/original/fresh-lemon-fruit-free-png.png"
    },
    {
      id:3,
      name:"Fresas",
      price:2.50,
      picture:"https://assets.stickpng.com/images/580b57fcd9996e24bc43c1a1.png"
    },
    {
      id:3,
      name:"Manzanas",
      price: 2.50,
      picture:"https://static.vecteezy.com/system/resources/previews/008/848/360/non_2x/fresh-apple-fruit-free-png.png"
    },
    {
      id:3,
      name:"Uva",
      price:2.70,
      picture:"https://www.pngplay.com/wp-content/uploads/6/Black-Grapes-PNG.png"
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
