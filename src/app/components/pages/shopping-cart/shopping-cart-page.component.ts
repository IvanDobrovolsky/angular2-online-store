import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Router }                                          from '@angular/router';
import { HTTP_PROVIDERS }                                  from '@angular/http';
import { NgFor }                                           from '@angular/common';

import { Computer } from './../../../models/computer.model';

import { ShoppingCartItemComponent } from './shopping-cart-item/shopping-cart-item.component';

import { ApiService }          from './../../../services/api.service';
import { ShoppingCartService } from './../../../services/shopping-cart-service';

interface IShoppingCartItem extends Computer {
    quantity: number;
}

@Component({
    moduleId: module.id,
    encapsulation: ViewEncapsulation.Emulated,
    selector: 'shopping-cart',
    templateUrl: 'shopping-cart-page.component.html',
    styleUrls: [
        'shopping-cart-page.component.css'
    ],
    directives: [
        NgFor,
        ShoppingCartItemComponent
    ],
    providers: []
})
export class ShoppingCartComponent implements OnInit, OnDestroy{

    private items: Array<IShoppingCartItem> = [];
    private total = 0;

    constructor(private apiService: ApiService, private shoppingCartService: ShoppingCartService) {

    }

    public ngOnInit(): void {
        const cartItems = this.shoppingCartService.getCartItems();

        //TODO Think how to use RxJs methods instead
        cartItems.forEach(item => {
                this.apiService
                    .getComputerById(item._id)
                    .subscribe(response => {
                        if (response.success) {
                            const computer: Computer = response.data[0];
                            this.items.push(Object.assign(computer, {quantity: item.quantity}));
                        }
                    }, error => console.error(`An error has occurred! ${error}`));
            });
        //TODO Use Observable function instead
        setTimeout(() => this.total = this.calculateTotal(), 500);

    }

    public ngOnDestroy(): void {
        this.items = null;
    }

    private calculateTotal(): number {
        console.log(this.items);
        let total = 0;
        this.items.forEach(item => {
            total += item.price * item.quantity;
        });
        return total;
    }

    //TODO use observable data service instead
    private changeQuantity(id:number, newQuantity): void {
        this.shoppingCartService.changeQuantity(id, newQuantity);
        this.total = this.calculateTotal();
    }

}

