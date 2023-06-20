import { Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewContainerRef } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { ClienteProductoComponent, ClienteProductosService, ClientelaService, ProductosService } from 'src/app/core';
import * as moment from 'moment-timezone';
import esLocale from '@fullcalendar/core/locales/es';
import { ClienteProductoCalendarioComponent } from 'src/app/core/components/cliente-producto-calendario/cliente-producto-calendario.component';
import TimeGridPlugin  from '@fullcalendar/timegrid';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss'],
})
export class CalendarioComponent implements OnInit {

  public calendarOptions: CalendarOptions = this.initCalendar();

  constructor(
    private clientelaSvc: ClientelaService,
    private productosSvc: ProductosService,
    private clienteProductosSvc: ClienteProductosService,
    private containerRef: ViewContainerRef
  ) {
    this.clienteProductosSvc.clienteProductos$.subscribe((producto)=>{
      
      this.calendarOptions = {
        plugins: [TimeGridPlugin], //
        locale:esLocale,
        initialView: 'timeGridDay',
        height: 'auto',
        slotDuration: '00:30:00',
        slotLabelInterval: '00:30',
        eventOverlap:false,
        contentHeight:'auto',
        eventChange:(event)=>{
          console.log(event.event.start);
          console.log(event.event.extendedProps['clienteProducto'].createdAt)
          
          var clienteProducto = {...event.event.extendedProps['clienteProducto']};
          clienteProducto.createdAt = moment(event.event.start).toISOString();
          this.clienteProductosSvc.updateClienteProducto(clienteProducto);
          
        },
        editable:true,
        events: producto.map(async a=>{
          try {
            var task = await this.productosSvc.getProductoById(a.productoId);  
            return {
              "title":task.name, 
              "start":moment(a.createdAt).toISOString(), 
              // "end":moment(a.dateTime).add(task.durationInSecs, 'seconds').toISOString(),
              "assignment":a
            };
          } catch (error) {
            return{
              "title":"", 
              "start":null,
              "end":null,
              "assignment":a
            }
          }
          
          
        }),
        eventContent:(arg)=>{
          var comp:ComponentRef<ClienteProductoCalendarioComponent> = this.containerRef.createComponent(ClienteProductoCalendarioComponent);
          comp.instance.clienteProducto = arg.event.extendedProps['clienteProducto'];
          return { domNodes: [comp.location.nativeElement] }
          
        }

      };
      
    });
  }


  public ngOnInit(): void {
    // HACK Rerender the calendar and correctly display it
     setTimeout(() => {
       this.calendarOptions.footerToolbar = false;
     }, 300);
  }


   private initCalendar(): CalendarOptions {

    return {
      initialView: 'timeGridWeek',
      height: 'auto',
      slotDuration: '00:30:00',
      slotLabelInterval: '01:00',
      editable:true,
      events: [
    ],
    };
  }
}
