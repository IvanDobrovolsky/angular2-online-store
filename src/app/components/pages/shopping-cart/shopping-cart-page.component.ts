import { Component, OnInit } from '@angular/core';
import { Observable }        from 'Rxjs';
import { Store }             from '@ngrx/store';

import { IShoppingCartItem, Computer } from '../../../models';
import * as shoppingCart from '../../../actions/shopping-cart.action';
import * as fromRoot from '../../../reducers';

@Component({
    selector: 'shopping-cart',
    templateUrl: 'shopping-cart-page.component.html',
    styleUrls: [
        'shopping-cart-page.component.css'
    ]
})
export class ShoppingCartComponent implements OnInit {

    private items$: Observable<Computer[]>;
    private total$: Observable<number>;

    constructor(
        private store: Store<fromRoot.State>
    ) {}


    public ngOnInit(): void {
        const shoppingCartStore$ = this.store.select('shoppingCart');

        this.items$ = shoppingCartStore$
            .map((items: IShoppingCartItem[]) => this.retrieveProductsFromCartItems(items));

        this.total$ = shoppingCartStore$
            .map((items: IShoppingCartItem[]) => this.calculateTotal(items));
    }

    public removeFromCart(item: Computer): void {
        this.store.dispatch(new shoppingCart.RemoveFromCartAction({product: item, quantity: 0}))
    }

    private calculateTotal(items: IShoppingCartItem[]): number {
        let result = 0;

        for (let item of items) {
            result += item.product.price * item.quantity;
        }

        return result;
    }

    private retrieveProductsFromCartItems (items: IShoppingCartItem[]): Computer[] {
        return items.map((i: IShoppingCartItem) => i.product);
    }
}

