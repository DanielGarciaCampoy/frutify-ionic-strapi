import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ClienteProductoModel } from 'src/app/core';
import { ClienteProductosService } from 'src/app/core';
import { ClienteProductoComponent } from 'src/app/core';

@Component({
  selector: 'app-lista-compras',
  templateUrl: './lista-compras.component.html',
  styleUrls: ['./lista-compras.component.scss'],
})
export class ListaComprasComponent implements OnInit {

  constructor(
    private clienteProductosSvc:ClienteProductosService,
    private modal:ModalController,
    private alert:AlertController
  ) { }

  ngOnInit() {}

  getClienteProductos(){
    return this.clienteProductosSvc.clienteProductos$;
  }

  getClienteProductosByClienteId(id:number){
    return this.clienteProductosSvc.getClienteProductosByClienteId(id);
  }

  async presentClienteProductosForm(clienteProducto:ClienteProductoModel){
    const modal = await this.modal.create({
      component:ClienteProductoComponent,
      componentProps:{
        clienteProducto:clienteProducto
      },
      cssClass:"modal-full-right-side"
    });
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        switch(result.data.mode){
          case 'New':
            this.clienteProductosSvc.addClienteProducto(result.data.clienteProducto);
            break;
          case 'Edit':
            this.clienteProductosSvc.updateClienteProducto(result.data.clienteProducto);
            break;
          default:
        }
      }
    });
  }

  onEditClienteProducto(clienteProducto: any){
    this.presentClienteProductosForm(clienteProducto);
  }

  async onDeleteAlert(clienteProducto: any){
    const alert = await this.alert.create({
      header: '¿Está seguro de que desear borrar la compra?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log("Operacion cancelada");
          },
        },
        {
          text: 'Borrar',
          role: 'confirm',
          handler: () => {
            this.clienteProductosSvc.deleteClienteProductoById(clienteProducto.id);
          },
        },
      ],
    });
    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  onDeleteClienteProducto(clienteProducto: any){
    this.onDeleteAlert(clienteProducto);
     
   }

}
