import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES }                               from '@angular/router';

import { ShoppingCartService} from './../../../services/shopping-cart-service';

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
    ],
    providers: []
})
export class NavigationComponent implements OnInit, OnDestroy {

    private cartSize: number;

    constructor(private shoppingCartService: ShoppingCartService) {

    }

    ngOnInit(): void {
        this.shoppingCartService.cartSizeStream.subscribe(newSize => this.cartSize = newSize);
        this.shoppingCartService.loadCartSizeValue();
    }

    ngOnDestroy(): void {
        return undefined;
    }

}