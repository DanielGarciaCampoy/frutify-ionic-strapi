import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ProductoDetailComponent } from 'src/app/core/components';
import { Producto } from 'src/app/core/models';
import { ProductosService } from 'src/app/core/services/productos.service';

import { ClienteProductosService } from 'src/app/core';
import { BehaviorSubject } from 'rxjs';

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
  ) { }

  ngOnInit() {

    this.productosSvc._productos$.subscribe((productos) => {
      this.productoFiltrado = productos;
      this.actualizarProductoFiltrado('');
    });
    this.productosSvc.refresh();
  }

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

  // searchbar
  productoFiltrado:Producto[];
  private _productoFiltradoSubject:BehaviorSubject<Producto[]> = new BehaviorSubject([]);
  public productoFiltrado$ = this._productoFiltradoSubject.asObservable();

  buscar ( event ) {
      const query = event.target.value;
      const productos = this.productosSvc.getProductos();
        this.productoFiltrado = productos.filter(p =>
          p.name.toLowerCase().indexOf(query) > -1
       );
      this.actualizarProductoFiltrado(query);
      
      
  }

  private actualizarProductoFiltrado(query: string) {
    this.productoFiltrado = this.productosSvc
      .getProductos()
      .filter((producto) => producto.name.toLowerCase().includes(query));
    this._productoFiltradoSubject.next(this.productoFiltrado);
  }
  
}
