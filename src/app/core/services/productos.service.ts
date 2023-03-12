import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductoComponent } from '../components';
import { Producto } from '../models/producto.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosService implements OnDestroy {

  private _productosSubject:BehaviorSubject<Producto[]> = new BehaviorSubject([]);
  public _productos$ = this._productosSubject.asObservable();
  unsubscr: () => void;

  constructor(
    private api:ApiService
  ) {
    this.refresh();
   }
  ngOnDestroy(): void {
    this.unsubscr();
  }

  private async refresh(){
    this.api.get('/api/productos?populate=picture').subscribe({
      next:response=>{
        console.log(response);
        var array:Producto[] = (response.data as Array<any>).map<Producto>(producto=>{
          return {id:producto.id, 
                  name:producto.attributes.name,  
                  price:producto.attributes.price,
                  picture:producto.attributes.picture.data?
                          environment.api_url+producto.attributes.picture.data.attributes.url:
                          "" 
          };
        });
        this._productosSubject.next(array);
        
      },
      error:err=>{
        console.log(err);
      }
    });
  }

  getProductos(){
    return this._productosSubject.value;
  }
  
  getProductoById(id:number):Promise<Producto>{
    return new Promise<Producto>((resolve, reject)=>{
      this.api.get(`/api/productos/${id}?populate=picture`).subscribe({
        next:(producto)=>{
          resolve({
                  id:producto.id, 
                  name:producto.attributes.name, 
                  price:producto.attributes.price,
                  picture:producto.attributes.picture.data?
                          environment.api_url+producto.attributes.picture.data.attributes.url:
                          "" 
          });
          
        },
        error:err=>{
          reject(err);
        }
      });
    });
  }

  deleteProductoById(id:number){
    this.api.delete(`/api/productos/${id}`).subscribe({
      next:data=>{
        this.refresh();
      },
      error:err=>{
        console.log(err);
      }
    });
  }

  async addProducto(producto:Producto){
    var _producto = {
        name:producto.name, 
        price:producto.price,
    };
    this.api.post(`/api/productos`,{
      data:_producto
    }).subscribe({
      next:data=>{
        this.refresh();
      },
      error:err=>{
        console.log(err);
      }
    });
  }

  updateProducto(producto:Producto) {
    this.api.put(`/api/productos/${producto.id}`,{
      data:{
        name:producto.name, 
        price:producto.price,
      }
    }).subscribe({
      next:data=>{
        this.refresh(); 
      },
      error:err=>{
        console.log(err);
      }
    });
  }
  
}