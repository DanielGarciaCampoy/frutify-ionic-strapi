import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

// translate
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from './utils/translate.utils';
import es from '@angular/common/locales/es';
import en from '@angular/common/locales/en';
registerLocaleData(en);
registerLocaleData(es);

// Components
import { ProductoComponent, ClienteComponent } from '.';
import { ProductoDetailComponent, ClienteDetailComponent, ClienteProductoComponent, ClienteProductoDetailComponent } from './components';

@NgModule({
  // Components
  declarations: [
    ProductoComponent, ProductoDetailComponent, ClienteComponent, ClienteDetailComponent, ClienteProductoComponent,ClienteProductoDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    HttpClientModule,
    TranslateModule.forChild({
      loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [HttpClient]
      }
      }),
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    IonicModule,
    ReactiveFormsModule,
    ProductoComponent,
    ProductoDetailComponent,
    ClienteComponent,
    ClienteDetailComponent,
    ClienteProductoComponent,
    ClienteProductoDetailComponent
  ],
  providers:[
    {
      provide: LOCALE_ID,
      useValue: 'es'
    },
  ]
})
export class CoreModule { }
