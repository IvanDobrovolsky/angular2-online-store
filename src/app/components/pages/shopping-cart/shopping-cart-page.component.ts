import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, Subscription }                        from 'Rxjs';
import 'rxjs/Rx';

import { ICartProductItem } from '../../.';

import { ApiService, ShoppingCartService, SubscriptionService } from '../../.';

@Component({
    encapsulation: ViewEncapsulation.Emulated,
    selector: 'shopping-cart',
    templateUrl: 'shopping-cart-page.component.html',
    styleUrls: [
        'shopping-cart-page.component.css'
    ]
})
export class ShoppingCartComponent implements OnInit, OnDestroy{

    private items: Observable<ICartProductItem[]>;
    private total: number;

    private subscriptions: Array<Subscription> = [];

    constructor(
        private apiService: ApiService,
        private subscriptionService: SubscriptionService,
        private shoppingCartService: ShoppingCartService
    ) {}


    public ngOnInit(): void {
        this.shoppingCartService.loadCart();
        this.items = this.shoppingCartService.cartItemsStream;
        //noinspection TypeScriptUnresolvedFunction
        const cartItemsStreamSubscription = this.shoppingCartService
            .cartItemsStream
            .subscribe(data => this.calculateTotal(data));

        this.subscriptions.push(cartItemsStreamSubscription);
    }

    public ngOnDestroy(): void {
        this.subscriptionService.unsubscribeFromAllObservables(this.subscriptions);
    }

    private calculateTotal(items) {
        let result = 0;
        for (let item of items) {
            result += item.price * item.quantity;
        }
        this.total = result;
    }
}

