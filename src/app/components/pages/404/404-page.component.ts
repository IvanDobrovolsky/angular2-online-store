import { Component, ViewEncapsulation } from '@angular/core';
import { ROUTER_DIRECTIVES }            from '@angular/router';

@Component({
    moduleId: module.id,
    encapsulation: ViewEncapsulation.Emulated,
    selector: 'page-404',
    templateUrl: '404-page.component.html',
    styleUrls: [
        '404-page.component.css'
    ],
    directives: [
        ROUTER_DIRECTIVES
    ]
})
export class PageNotFoundComponent {
    private message = "The page you requested is not found!";
    private imageUrl = "http://72gpf1za5iq428ekh3r7qjc1.wpengine.netdna-cdn.com/wp-content/uploads/2015/11/error.jpg";
}