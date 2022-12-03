import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';

import { CoreModule } from '../core/core.module';

// Translate
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from '../core/utils/translate.utils';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// Componentes
import { HomeComponent } from './components/home/home.component';
import { ComprarComponent } from './components/comprar/comprar.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { AboutComponent } from './components/about/about.component';
import { ClientelaComponent } from "./components/clientela/clientela.component";

@NgModule({
    declarations: [
        FolderPage, HomeComponent, ComprarComponent, CarritoComponent, ClientelaComponent, AboutComponent
    ],
    imports: [
        CoreModule,
        CommonModule,
        FormsModule,
        IonicModule,
        FolderPageRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
    ]
})
export class FolderPageModule {}
