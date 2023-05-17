import { Component, OnInit, Input, Output, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { EventEmitter } from 'stream';
import { Cliente } from "../../models/cliente.model";
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-cliente-detail',
  templateUrl: './cliente-detail.component.html',
  styleUrls: ['./cliente-detail.component.scss'],
})
export class ClienteDetailComponent implements OnInit {

  form:FormGroup;
  mode:"New" | "Edit" = "New";

  currentImage = new BehaviorSubject<string>("");
  currentImage$ = this.currentImage.asObservable();

  @Input('cliente') set cliente(cliente:Cliente) {
    if(cliente){
      this.form.controls['id'].setValue(cliente.id);
      this.form.controls['name'].setValue(cliente.name);
      this.form.controls['username'].setValue(cliente.username);
      this.form.controls['picture'].setValue(cliente.picture);

      if(cliente.picture)
        this.currentImage.next(cliente.picture);
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
      username:['',[Validators.required]],
      picture:[''],
      pictureFile:[null]
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.modal.dismiss({cliente: this.form.value, mode:this.mode}, 'ok');
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
