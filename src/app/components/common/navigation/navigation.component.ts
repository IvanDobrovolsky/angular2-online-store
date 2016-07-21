import { Component, ViewEncapsulation } from '@angular/core';
import { ROUTER_DIRECTIVES }            from '@angular/router';

@Component({
    moduleId: module.id,
    encapsulation: ViewEncapsulation.Emulated,
    selector: 'navigation',
    templateUrl: 'navigation.component.html',
    styleUrls: [
        'navigation.component.css'
    ],
    directives: [
        ROUTER_DIRECTIVES
    ]
})
export class NavigationComponent {

}