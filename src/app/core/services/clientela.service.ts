import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ClientelaService {

  private _cliente:Cliente[] = [];

  private _clientelaSubject:BehaviorSubject<Cliente[]> = new BehaviorSubject<Cliente[]>([]);
  public _clientela$ = this._clientelaSubject.asObservable();

  constructor(
    public api:ApiService
  ) {
    this.refresh();
  }

  async refresh(){
    this.api.get('/api/clientes?populate=picture').subscribe({
      next:data=>{
        console.log(data);
        var array:Cliente[] = (data.data as Array<any>).map<Cliente>(cliente=>{
          return {id:cliente.id, 
                     name:cliente.attributes.name, 
                     username:cliente.attributes.username, 
                     picture:cliente.attributes.picture.data?
                             environment.api_url+cliente.attributes.picture.data.attributes.url:
                             "" 
                  };
        });
        this._clientelaSubject.next(array);

      },
      error:err=>{
        console.log(err);
      }
    });
  }

  getClientela(){
    return this._clientelaSubject.value;
  }

  getClienteById(id:number):Promise<Cliente>{
    return new Promise<Cliente>((resolve, reject)=>{
      this.api.get(`/api/clientes/${id}?populate=picture`).subscribe({
        next:data=>{
          resolve({
            id:data.data.id,
            name:data.data.attributes.name,
            username:data.data.attributes.username,
            picture:data.data.attributes.picture.data?
                    environment.api_url+data.data.attributes.picture.data?.attributes.url:
                    ""
          });
          
        },
        error:err=>{
          reject(err);
        }
      });
    });
  }

  deleteClienteById(id:number){
    this.api.delete(`/api/clientes/${id}`).subscribe({
      next:data=>{
        this.refresh();
      },
      error:err=>{
        console.log(err);
      }
    });
  }

  async addCliente(cliente:Cliente){
    var _cliente = {
      name:cliente.name,
      username:cliente.username,
    };
    if(cliente['pictureFile']){
      var id = await this.uploadImage(cliente['pictureFile']);
      _cliente['picture'] = id;
    }
    this.api.post(`/api/clientes`,{
      data:_cliente
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

  async updateCliente(cliente:Cliente) {
    var _cliente = {
      name:cliente.name,
      username:cliente.username,
    };
    if(cliente['pictureFile']){
      var id = await this.uploadImage(cliente['pictureFile']);
      _cliente['picture'] = id;
    }
    this.api.put(`/api/clientes/${cliente.id}`,{
      data:_cliente
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
