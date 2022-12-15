import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';

// models, services
import { ClienteProductoModel } from '../../models';
import { ClientelaService, ClienteProductosService, ProductosService } from '../../services';
import { ClienteDetailComponent } from '../cliente-detail/cliente-detail.component';

@Component({
  selector: 'app-cliente-producto-detail',
  templateUrl: './cliente-producto-detail.component.html',
  styleUrls: ['./cliente-producto-detail.component.scss'],
})
export class ClienteProductoDetailComponent implements OnInit {

  form:FormGroup;
  mode:"New" | "Edit" = "New";
  button_text = "";
  @Input('clienteProducto') set clienteProducto(clienteProducto:ClienteProductoModel){
    if(clienteProducto){
      this.form.controls['id'].setValue(clienteProducto.id);
      this.form.controls['productoId'].setValue(clienteProducto.productoId);
      this.form.controls['clienteId'].setValue(clienteProducto.clienteId);
      this.form.controls['fechaCompra'].setValue(clienteProducto.fechaCompra);
      this.form.controls['kgComprados'].setValue(clienteProducto.kgComprados);
      this.mode = "Edit";
    }
  }

  constructor(
    private productosSvc:ProductosService,
    private clientelaSvc:ClientelaService,
    private clienteProductoSvc:ClientelaService,
    private fb:FormBuilder,
    private modal:ModalController,
    private translate:TranslateService
  ) { 
    this.form = this.fb.group({
      id:[null],
      productoId:[-1, [Validators.min(1)]],
      clienteId:[-1, [Validators.min(1)]],
      kgComprados:[Validators.required],
      fechaCompra:[null, [Validators.required]],
    });
   }

  ngOnInit() { }

  onSubmit() {
    this.modal.dismiss({clienteProducto: this.form.value, mode:this.mode}, 'ok');
  }

  onDismiss() {
    this.modal.dismiss(null, 'cancel')
  }
  
  
}
