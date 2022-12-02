import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-producto-detail',
  templateUrl: './producto-detail.component.html',
  styleUrls: ['./producto-detail.component.scss'],
})
export class ProductoDetailComponent implements OnInit {

  form:FormGroup;
  mode:"New" | "Edit" = "New";
  @Input('producto') set producto(producto:Producto) {
    if(producto){
      this.form.controls['id'].setValue(producto.id);
      this.form.controls['name'].setValue(producto.name);
      this.form.controls['price'].setValue(producto.price);
      this.form.controls['picture']?.setValue(producto.picture);
      this.mode = "Edit";
    }
  }

  constructor(
    private fb:FormBuilder,
    private modal:ModalController
  ) {
    this.form = this.fb.group({
      id:[null],
      name:['',[Validators.required]],
      price:['',[Validators.required]],
      pircture:['']
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.modal.dismiss({producto: this.form.value, mode:this.mode}, 'ok');
  }

  onDismiss(){
    this.modal.dismiss(null,'cancel');
  }

}
