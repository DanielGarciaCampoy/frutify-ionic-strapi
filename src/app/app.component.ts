import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
// import 'zone.js'
// import 'zone.js/dist/long-stack-trace-zone.js'

// login
import { UserService } from './core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'home', url: '/folder/home', icon: 'home' },
    { title: 'comprar', url: '/folder/comprar', icon: 'pricetag' },
    { title: 'clientes', url: '/folder/clientela', icon: 'people' },
    { title: 'listaCompras', url: '/folder/listaCompras', icon: 'list-circle' },
    { title: 'carrito', url: '/folder/carrito', icon: 'cart' },
    { title: 'about', url: '/folder/about', icon: 'information-circle' }
  ];
  public labels = [];

  language = 0; // 0 español, 1 ingles
  constructor(
    private translate: TranslateService,
    public user:UserService,
    private router:Router
  ) {
    this.translate.setDefaultLang('es')
  }

  // Cambiar idioma
  onLanguage() {
    this.language = (this.language+1)%2;
    switch(this.language) {
      case 0:
        this.translate.setDefaultLang('es');
        break;
      case 1:
        this.translate.setDefaultLang('en');
        break;
    }
  }

  // Modo claro / oscuro
  OnToggleDarkMode() {
    // document.body.removeAttribute('color-theme');
    document.body.setAttribute('color-theme', 'dark');
  }

  OnToggleLightMode() {
    //document.body.removeAttribute('color-theme');
    document.body.setAttribute('color-theme', 'light');
  }

  signOut(){
    this.user.signOut();
    this.router.navigate(['login']);
  }
  
}
