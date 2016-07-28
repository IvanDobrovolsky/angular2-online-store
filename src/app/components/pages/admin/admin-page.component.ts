import { Component, ViewEncapsulation } from '@angular/core';
import { ROUTER_DIRECTIVES }            from '@angular/router';

@Component({
    moduleId: module.id,
    encapsulation: ViewEncapsulation.Emulated,
    selector: 'admin-page',
    templateUrl: 'admin-page.component.html',
    styleUrls: [
        'admin-page.component.css'
    ],
    directives: [
        ROUTER_DIRECTIVES,
    ],
    providers: []
})
export class AdminPageComponent { 
    
}