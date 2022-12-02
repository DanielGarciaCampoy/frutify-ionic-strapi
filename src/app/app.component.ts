import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

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
    { title: 'carrito', url: '/folder/carrito', icon: 'cart' },
    { title: 'about', url: '/folder/about', icon: 'information-circle' }
    // { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = [];

  language = 0; // 0 español, 1 ingles
  constructor(
    private translate: TranslateService
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
    document.body.setAttribute('color-theme', 'dark');
  }

  OnToggleLightMode() {
    document.body.setAttribute('color-theme', 'light');
  }

  
}
