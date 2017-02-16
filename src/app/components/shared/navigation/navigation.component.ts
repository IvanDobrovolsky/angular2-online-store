import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription }                                    from 'Rxjs'

import { ShoppingCartService, SubscriptionService } from '../../.';

@Component({
    encapsulation: ViewEncapsulation.Emulated,
    selector: 'navigation',
    templateUrl: 'navigation.component.html',
    styleUrls: [
        'navigation.component.css'
    ]
})
export class NavigationComponent implements OnInit, OnDestroy {

    private cartSize: number;

    private subscriptions: Array<Subscription> = [];

    constructor(
        private shoppingCartService: ShoppingCartService,
        private subscriptionService: SubscriptionService
    ) {}

    public ngOnInit(): void {
        const subscriptionToCartSizeStream: Subscription = this.shoppingCartService.cartSizeStream.subscribe(newSize => this.cartSize = newSize);
        this.shoppingCartService.loadCartSizeValue();

        this.subscriptions.push(subscriptionToCartSizeStream);
    }

    public ngOnDestroy(): void {
        this.subscriptionService.unsubscribeFromAllObservables(this.subscriptions);
    }

}
