import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from '../../models/producto.model';
import { ProductosService } from "../../services/productos.service";

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
})
export class ProductoComponent implements OnInit {

  @Output() onEdit = new EventEmitter;
  @Output() onDelete = new EventEmitter;
  @Input() producto:Producto | undefined;
  constructor(private productosSvc:ProductosService) { }

  ngOnInit() {}

  onEditClick(){
    this.onEdit.emit(this.producto);
  }

  onDeleteClick() {
    this.onDelete.emit(this.producto);
  }

}
