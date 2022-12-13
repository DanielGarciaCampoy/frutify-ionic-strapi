import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cliente } from '../../models/cliente.model';
import { ClientelaService } from '../../services/clientela.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})
export class ClienteComponent implements OnInit {

  @Output() onEdit = new EventEmitter;
  @Output() onDelete = new EventEmitter;
  @Input() cliente:Cliente;
  constructor(private clientelaSvc:ClientelaService) { }

  ngOnInit() {}

  onEditClick(){
    this.onEdit.emit(this.cliente);
  }

  onDeleteClick() {
    this.onDelete.emit(this.cliente);
  }
}
