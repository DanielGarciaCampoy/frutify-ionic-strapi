import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Producto } from '../../models/producto.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-producto-detail',
  templateUrl: './producto-detail.component.html',
  styleUrls: ['./producto-detail.component.scss'],
})
export class ProductoDetailComponent implements OnInit {

  form:FormGroup;
  mode:"New" | "Edit" = "New";

  currentImage = new BehaviorSubject<string>("");
  currentImage$ = this.currentImage.asObservable();

  @Input('producto') set producto(producto:Producto) {
    if(producto){
      this.form.controls['id'].setValue(producto.id);
      this.form.controls['name'].setValue(producto.name);
      this.form.controls['price'].setValue(producto.price);
      this.form.controls['picture'].setValue(producto.picture);

      if(producto.picture)
        this.currentImage.next(producto.picture);
      this.form.controls['pictureFile'].setValue(null);

      this.mode = "Edit";
    }
  }

  constructor(
    private fb:FormBuilder,
    private modal:ModalController,
    private cdr:ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      id:[null],
      name:['',[Validators.required]],
      price:['',[Validators.required]],
      picture:[''],
      pictureFile:[null]
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.modal.dismiss({producto: this.form.value, mode:this.mode}, 'ok');
  }

  onDismiss(){
    this.modal.dismiss(null,'cancel');
  }

  changePic(fileLoader){
    fileLoader.click();
    var that = this;
    fileLoader.onchange = function () {
      var file = fileLoader.files[0];
      var reader = new FileReader();
      reader.onload = () => {   
        that.currentImage.next(reader.result as string);
        that.cdr.detectChanges();
        that.form.controls['pictureFile'].setValue(file);
      };
      reader.onerror = (error) =>{
        console.log(error);
      }
      reader.readAsDataURL(file);
    }
  }

}
