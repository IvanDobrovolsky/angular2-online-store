import { Component, ViewEncapsulation } from '@angular/core';
import { ROUTER_DIRECTIVES }            from '@angular/router';
import { HTTP_PROVIDERS }               from '@angular/http';

import { NavigationComponent } from './common/navigation/navigation.component';

import { ApiService }          from './../services/api.service';
import { ShoppingCartService } from './../services/shopping-cart-service';

//TODO add route guards
//TODO rename common->shared
//TODO rewrite the code according to the styleguide
//TODO Think how to optimize the code using ChangeDetectionStrategy.OnPush
//TODO Use ngAnimate for
//TODO Refactor the app to serve assets automatically

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
