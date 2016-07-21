import { Component, ViewEncapsulation } from '@angular/core';
import { ROUTER_DIRECTIVES }            from '@angular/router';

import { NavigationComponent } from './common/navigation/navigation.component';

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
  providers: []
})
export class AppComponent{

  constructor(){}

}
