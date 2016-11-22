import { Component, ViewEncapsulation } from '@angular/core';

import { NavigationComponent } from './shared/index';


//TODO add route guards
//TODO rewrite the code according to the styleguide
//TODO Think how to optimize the code using ChangeDetectionStrategy.OnPush
//TODO Use ngAnimate for
//TODO create RouterService in order to let angular inject 1 instance into all components instead of creating multiple ones by ourselves

@Component({
    encapsulation: ViewEncapsulation.Emulated,
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: [
        'app.component.css'
    ]
})
export class AppComponent {
    constructor() {

    }
}
