import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ClienteDetailComponent } from 'src/app/core/components/cliente-detail/cliente-detail.component';
import { Cliente } from 'src/app/core/models/cliente.model';
import { ClientelaService } from 'src/app/core/services/clientela.service';

@Component({
  selector: 'app-clientela',
  templateUrl: './clientela.component.html',
  styleUrls: ['./clientela.component.scss'],
})
export class ClientelaComponent implements OnInit {

  constructor(
    private clientelaSvc:ClientelaService,
    private modal:ModalController,
    private alert:AlertController
  ) { }

  ngOnInit() {}

  getClientela(){
    return this.clientelaSvc.getClientela();
  }

  async presentClienteForm(cliente:Cliente | null){
    const modal = await this.modal.create({
      component:ClienteDetailComponent,
      componentProps:{
        cliente:cliente
      }
    });
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        switch(result.data.mode){
          case 'New':
            this.clientelaSvc.addCliente(result.data.cliente);
            break;
          case 'Edit':
            this.clientelaSvc.updateCliente(result.data.cliente);
            break;
          default:
        }
      }
    });
  }

  onNewCliente(){
    this.presentClienteForm(null);  
  }
  

  onEditCliente(cliente: any){
    this.presentClienteForm(cliente);
  }

  async onDeleteAlert(cliente: any){
    const alert = await this.alert.create({
      header: '¿Está seguro de que desear borrar el cliente?',
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
            this.clientelaSvc.deleteClienteById(cliente.id);
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  onDeleteCliente(cliente: any){
    this.onDeleteAlert(cliente);
   }

  // Boton ayuda
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
   
}