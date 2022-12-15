import { Component, OnInit } from '@angular/core';
import { ClientelaService, ProductosService } from 'src/app/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
})
export class CarritoComponent implements OnInit {

  constructor(
    clientelaSvc:ClientelaService,
    productosSvc:ProductosService
  ) { }

  ngOnInit() {}

}