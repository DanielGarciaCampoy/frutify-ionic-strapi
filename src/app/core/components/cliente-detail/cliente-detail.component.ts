import { Component, OnInit, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { EventEmitter } from 'stream';
import { Cliente } from "../../models/cliente.model";

@Component({
  selector: 'app-cliente-detail',
  templateUrl: './cliente-detail.component.html',
  styleUrls: ['./cliente-detail.component.scss'],
})
export class ClienteDetailComponent implements OnInit {

  form:FormGroup;
  mode:"New" | "Edit" = "New";
  @Input('cliente') set cliente(cliente:Cliente) {
    if(cliente){
      this.form.controls['id'].setValue(cliente.id);
      this.form.controls['name'].setValue(cliente.name);
      this.form.controls['username'].setValue(cliente.username);
      this.form.controls['picture']?.setValue(cliente.picture);
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
      username:['',[Validators.required]],
      pircture:['']
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.modal.dismiss({cliente: this.form.value, mode:this.mode}, 'ok');
  }

  onDismiss(){
    this.modal.dismiss(null,'cancel');
  }


}
