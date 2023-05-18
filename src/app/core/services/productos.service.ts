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

  async refresh(){
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
                  id:producto.data.id, 
                  name:producto.data.attributes.name, 
                  price:producto.data.attributes.price,
                  picture:producto.data.attributes.picture.data?
                          environment.api_url+producto.data.attributes.picture.data.attributes.url:
                          ""
          });
          
        },
        error:err=>{
          reject(err);
        }
      });
    });
  }

  getProductoByClienteId(clienteId:number): Promise<Producto> {
    return new Promise<Producto>((resolve, reject) => {
      this.api.get(`/api/productos/${clienteId}?populate=clienteProductos`).subscribe({
        next: (producto) => {
          const clienteProductos = producto.data.relationships.clienteProductos.data.map(
            (clienteProducto: any) => clienteProducto.id
          );
          resolve({
            id: producto.data.id,
            name: producto.data.attributes.name,
            price: producto.data.attributes.price,
            picture: producto.data.attributes.picture.data
              ? environment.api_url + producto.data.attributes.picture.data.attributes.url
              : "",
            // clienteProductos: clienteProductos,
          });
        },
        error: (err) => {
          reject(err);
        },
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
    if(producto['pictureFile']){
      var id = await this.uploadImage(producto['pictureFile']);
      _producto['picture'] = id;
    }
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

  uploadImage(file){  
    return new Promise<number>((resolve, reject)=>{
      var formData = new FormData();
      formData.append('files', file);
      this.api.post("/api/upload",formData).subscribe({
        next: data=>{
          resolve(data[0].id);
        },
        error: err=>{
          reject(err);
        }
      });
    });
    
  }

  async updateProducto(producto:Producto) {
    var _producto = {
        name:producto.name, 
        price:producto.price,
    };
    if(producto['pictureFile']){
      var id = await this.uploadImage(producto['pictureFile']);
      _producto['picture'] = id;
    }
    this.api.put(`/api/productos/${producto.id}`,{
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
  

}