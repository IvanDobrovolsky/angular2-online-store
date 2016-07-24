import { Component, ViewEncapsulation } from '@angular/core';
import { ROUTER_DIRECTIVES }            from '@angular/router';
import { HTTP_PROVIDERS }               from '@angular/http';

import { NavigationComponent } from './common/navigation/navigation.component';

import { ApiService }          from './../services/api.service';
import { ShoppingCartService } from './../services/shopping-cart-service';


@Component({
  moduleId: module.id,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'app',
  templateUrl: 'app.component.html',
  styleUrls: [
    'app.component.css'
  ],
  directives: [
    ROUTER_DIRECTIVES,
    NavigationComponent
  ],
  providers: [
      HTTP_PROVIDERS,
      ApiService,
      ShoppingCartService
  ]
})
export class AppComponent{

  constructor(){}

}
