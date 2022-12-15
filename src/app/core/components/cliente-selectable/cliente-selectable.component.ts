import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonAccordionGroup } from '@ionic/angular';

import { Cliente } from '../../models';
import { ClientelaService } from '../../services';

export const USER_PROFILE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ClienteSelectableComponent),
  multi: true
};

@Component({
  selector: 'app-cliente-selectable',
  templateUrl: './cliente-selectable.component.html',
  styleUrls: ['./cliente-selectable.component.scss'],
  providers:[USER_PROFILE_VALUE_ACCESSOR]
})
export class ClienteSelectableComponent implements OnInit, ControlValueAccessor {

  selectedCliente:Cliente={};
  propagateChange = (_: any) => { }
  isDisabled:boolean = false;

  constructor(
    private clientelaSvc:ClientelaService
  ) { }

  writeValue(obj: any): void {
    this.selectedCliente = this.clientelaSvc.getClienteById(obj)!;
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

  getCliente(){
    return this.clientelaSvc.getClientela();
  } 

  onClienteClicked(cliente:Cliente, accordion:IonAccordionGroup){
    this.selectedCliente = cliente;
    accordion.value='';
    this.propagateChange(this.selectedCliente.id);
  }

}
