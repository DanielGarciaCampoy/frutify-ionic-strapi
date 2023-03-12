import { Injectable } from '@angular/core';
import { ClienteProductoModel } from '../models/cliente-producto.model';
import * as moment from 'moment-timezone';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteProductosService {

  private _clienteProductosSubject:BehaviorSubject<ClienteProductoModel[]> = new BehaviorSubject([]);
  public clienteProductos$ = this._clienteProductosSubject.asObservable();

  constructor(
    private api:ApiService
  ) { 
    this.refresh();
  }

  private async refresh(){
    this.api.get('/api/cliente-productos?populate=producto_id,cliente_id').subscribe({
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
      this.api.get(`/api/clienteProductos/${id}?populate=person_id, task_id`).subscribe({
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
      this.api.get( `/api/clienteProductos?cliente_id=${clienteId}&populate=producto_id,cliente_id`).subscribe({
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
      this.api.get( `/api/clienteProductos?producto_id=${productoId}&populate=producto_id, cliente_id`).subscribe({
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
    this.api.delete(`/api/clienteProductos/${id}`).subscribe({
      next:data=>{
        this.refresh();
      },
      error:err=>{
        console.log(err);
      }
    });
  }

  addClienteProducto(clienteProducto:ClienteProductoModel){
    this.api.post(`/api/clienteProductos`,{
      data:{
        person_id:clienteProducto.clienteId,
        task_id:clienteProducto.productoId,
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
    this.api.put(`/api/clienteProductos/${clienteProducto.id}`,{
      data:{
        cliente_id:clienteProducto.clienteId,
        producto_id:clienteProducto.productoId,
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
  
}
