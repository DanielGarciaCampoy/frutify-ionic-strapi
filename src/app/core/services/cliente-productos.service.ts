import { Injectable } from '@angular/core';
import { ClienteProductoModel } from '../models/cliente-producto.model';
import * as moment from 'moment-timezone';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteProductosService {

  private _clienteProductosSubject:BehaviorSubject<ClienteProductoModel[]> = new BehaviorSubject([]);
  public clienteProductos$ = this._clienteProductosSubject.asObservable();

  constructor(
    private api:ApiService,
    // private http: HttpClient
  ) { 
    this.refresh();
  }

  private async refresh(){
    this.api.get('/api/cliente-productos?populate=productoId,clienteId').subscribe({
      next:response=>{
        console.log(response);
        var array:ClienteProductoModel[] = (response.data as Array<any>).map<ClienteProductoModel>(clienteProducto=>{
          return {id:clienteProducto.id, 
                  clienteId:clienteProducto.attributes.clienteId.data.id, 
                  productoId:clienteProducto.attributes.productoId.data.id,
                  kgComprados:clienteProducto.attributes.kgComprados,
                  dateTime:clienteProducto.attributes.dateTime,
                  createdAt:clienteProducto.attributes.createdAt
          };
        });
        this._clienteProductosSubject.next(array);
        
      },
      error:err=>{
        console.log(err);
      }
    });
  }

  getClienteProductos(){
    return this._clienteProductosSubject.value;
  }

  getClienteProductoById(id:number){
    return new Promise<ClienteProductoModel>((resolve, reject)=>{
      this.api.get(`/api/cliente-productos/${id}?populate=person_id, producto_id`).subscribe({
        next:data=>{
          resolve({
            id:data.data.data.id,
            clienteId:data.data.attributes.cliente_id.id,
            productoId:data.data.attributes.producto_id.id,
            kgComprados:data.data.attributes.kgComprados,
            dateTime:data.data.attributes.dateTime,
            createdAt:data.data.attributes.createdAt
          });
          
        },
        error:err=>{
          reject(err);
        }
      });
    });
  }

  getClienteProductosByClienteId(clienteId:number):Promise<ClienteProductoModel[]>{    
    return new Promise<ClienteProductoModel[]>((resolve, reject)=>{
      this.api.get( `/api/cliente-productos?cliente_id=${clienteId}&populate=producto_id,cliente_id`).subscribe({
        next:response=>{
          console.log(response);
          var array:ClienteProductoModel[] = (response.data as Array<any>).map<ClienteProductoModel>(clienteProducto=>{
            return {id:clienteProducto.id, 
                    clienteId:clienteProducto.attributes.cliente_id.data.id, 
                    productoId:clienteProducto.attributes.producto_id.data.id,
                    kgComprados:clienteProducto.attributes.kgComprados,
                    dateTime:clienteProducto.attributes.dateTime,
                    createdAt:clienteProducto.attributes.createdAt
            };
          });
          resolve(array);
        },
        error:err=>{
          reject(err);
          console.log(err);
        }
      });
    });
  }

  getClienteProductosByProductoId(productoId:number):Promise<ClienteProductoModel[]>{
    return new Promise<ClienteProductoModel[]>((resolve, reject)=>{
      this.api.get( `/api/cliente-productos?producto_id=${productoId}&populate=producto_id, cliente_id`).subscribe({
        next:response=>{
          console.log(response);
          var array:ClienteProductoModel[] = (response.data as Array<any>).map<ClienteProductoModel>(clienteProducto=>{
            return {id:clienteProducto.id, 
                    clienteId:clienteProducto.attributes.cliente_id.data.id, 
                    productoId:clienteProducto.attributes.producto_id.data.id,
                    kgComprados:clienteProducto.attributes.kgComprados,
                    dateTime:clienteProducto.attributes.dateTime,
                    createdAt:clienteProducto.attributes.createdAt
            };
          });
          resolve(array);
        },
        error:err=>{
          reject(err);
          console.log(err);
        }
      });
    });
  }

  deleteClienteProductoById(id:number){
    this.api.delete(`/api/cliente-productos/${id}`).subscribe({
      next:data=>{
        this.refresh();
      },
      error:err=>{
        console.log(err);
      }
    });
  }

  addClienteProducto(clienteProducto:ClienteProductoModel){
    this.api.post(`/api/cliente-productos`,{
      data:{
        clienteId:clienteProducto.clienteId,
        productoId:clienteProducto.productoId,
        kgComprados:clienteProducto.kgComprados,
        dateTime:clienteProducto.dateTime
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

  updateClienteProducto(clienteProducto:ClienteProductoModel){
    this.api.put(`/api/cliente-productos/${clienteProducto.id}`,{
      data:{
        clienteId:clienteProducto.clienteId,
        productoId:clienteProducto.productoId,
        kgComprados:clienteProducto.kgComprados,
        dateTime:clienteProducto.dateTime
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

  getProductoByClienteId(clienteId: number): Promise<Producto> {
    return new Promise<Producto>((resolve, reject) => {
      this.api.get(`/api/productos/${clienteId}?populate=clienteProductos`).subscribe({
        next: (productoResponse) => {
          const productoData = productoResponse.data;
          const clienteProductos = productoData.relationships.clienteProductos.data.map(
            (clienteProducto: any) => clienteProducto.id
          );
          const producto: Producto = {
            id: productoData.id,
            name: productoData.attributes.name,
            price: productoData.attributes.price,
            picture: productoData.attributes.picture.data
              ? environment.api_url + productoData.attributes.picture.data.attributes.url
              : "",
            // clienteProductos: clienteProductos,
          };
          resolve(producto);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }
  
}
