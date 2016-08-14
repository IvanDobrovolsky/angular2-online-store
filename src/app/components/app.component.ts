import { Component, ViewEncapsulation } from '@angular/core';
import { ROUTER_DIRECTIVES }            from '@angular/router';
import { HTTP_PROVIDERS }               from '@angular/http';

import { NavigationComponent } from './shared/index';

import {
    ApiService,
    ShoppingCartService,
    SubscriptionService,
    NotificationService
}  from './../services/index';

//TODO add route guards
//TODO rewrite the code according to the styleguide
//TODO Think how to optimize the code using ChangeDetectionStrategy.OnPush
//TODO Use ngAnimate for
//TODO add notification from NotificationService
//TODO create RouterService in order to let angular inject 1 instance into all components instead of creating multiple ones by ourselves

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
      ShoppingCartService,
      NotificationService,
      SubscriptionService
  ]
})
export class AppComponent{

  constructor(){}

}
