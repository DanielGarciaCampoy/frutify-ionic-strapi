import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'; // NG_VALUE_ACCESSOR
import { IonAccordionGroup } from '@ionic/angular';

import { Producto } from '../../models';
import { ProductosService } from '../../services';


export const USER_PROFILE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ProductoSelectableComponent),
  multi: true
};

@Component({
  selector: 'app-producto-selectable',
  templateUrl: './producto-selectable.component.html',
  styleUrls: ['./producto-selectable.component.scss'],
  providers:[USER_PROFILE_VALUE_ACCESSOR]
})
export class ProductoSelectableComponent implements OnInit, ControlValueAccessor {

  selectedProducto:Producto={};
  propagateChange = (_: any) => { }
  isDisabled:boolean = false;

  constructor(
    private productosSvc:ProductosService
  ) { }

  async writeValue(obj: any) {
    try {
      this.selectedProducto = await this.productosSvc.getProductoById(obj);
    } catch (error) {
      console.log("No se ha podido recueperar los datos: " + error);
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  ngOnInit() {}

  getProducto(){
    return this.productosSvc.getProductos();
  } 

  onProductoClicked(producto:Producto, accordion:IonAccordionGroup){
    this.selectedProducto = producto;
    accordion.value='';
    this.propagateChange(this.selectedProducto.id);
  }

}
