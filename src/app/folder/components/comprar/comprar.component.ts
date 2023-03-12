import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ProductoDetailComponent } from 'src/app/core/components';
import { Producto } from 'src/app/core/models';
import { ProductosService } from 'src/app/core/services/productos.service';

import { ClienteProductosService } from 'src/app/core';

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.scss'],
})
export class ComprarComponent implements OnInit {

  constructor(
    private productosSvc:ProductosService,
    private modal:ModalController,
    private alert:AlertController
    // private clienteProductosSvc:ClienteProductosService
  ) { }

  ngOnInit() {}

  getProductos(){
    return this.productosSvc.getProductos();
  }

  async presentProductoForm(producto:Producto | null){
    const modal = await this.modal.create({
      component:ProductoDetailComponent,
      componentProps:{
        producto:producto
      }
    });
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        switch(result.data.mode){
          case 'New':
            this.productosSvc.addProducto(result.data.producto);
            break;
          case 'Edit':
            this.productosSvc.updateProducto(result.data.producto);
            break;
          default:
        }
      }
    });
  }
  onNewProducto(){
    this.presentProductoForm(null);  
  }
  

  onEditProducto(producto: any){
    this.presentProductoForm(producto);
  }

  async onDeleteAlert(producto: any){
    const alert = await this.alert.create({
      header: '¿Está seguro de que desear borrar el producto?',
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
            this.productosSvc.deleteProductoById(producto.id);
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  onDeleteProducto(producto: any){
   this.onDeleteAlert(producto);
    
  }

  // Boton ayuda
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  
}
