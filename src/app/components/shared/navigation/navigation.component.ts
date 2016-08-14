import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES }                               from '@angular/router';
import { Subscription }                                    from 'Rxjs'

import { ShoppingCartService, SubscriptionService } from './../../../services/index';

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

    private subscriptions: Array<Subscription> = [];

    constructor(
        private shoppingCartService: ShoppingCartService,
        private subscriptionService: SubscriptionService
    ) {}

    ngOnInit(): void {
        const subscriptionToCartSizeStream: Subscription = this.shoppingCartService.cartSizeStream.subscribe(newSize => this.cartSize = newSize);
        this.shoppingCartService.loadCartSizeValue();

        this.subscriptions.push(subscriptionToCartSizeStream);
    }

    ngOnDestroy(): void {
        this.subscriptionService.unsubscribeFromAllObservables(this.subscriptions);
    }

}