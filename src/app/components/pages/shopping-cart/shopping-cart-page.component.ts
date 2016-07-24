import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Router }                                          from '@angular/router';
import { HTTP_PROVIDERS }                                  from '@angular/http';
import { NgFor }                                           from '@angular/common';

import { Computer } from './../../../models/computer.model';

import { ShoppingCartItemComponent } from './shopping-cart-item/shopping-cart-item.component';

import { ApiService } from './../../../services/api.service';
import { ShoppingCartService } from './../../../services/shopping-cart-service';

interface IShoppingCart {
    calculateTotal(): number;
    changeQuantity(id: number, newQuantity): void;
    removeFromShoppingCart(id: number): void;
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
export class ShoppingCartComponent implements OnInit, OnDestroy, IShoppingCart{

    private items: Array<Computer> = [];

    constructor(private apiService: ApiService, private shoppingCartService: ShoppingCartService) {

    }

    ngOnInit(): void {
        const cartItems = this.shoppingCartService.getCartItems();

        //TODO Think how to use RxJs methods instead
        cartItems.forEach(item => {
                this.apiService
                    .getComputerById(item._id)
                    .subscribe(response => {
                        if (response.success) {
                            this.items.push(response.data[0]);
                        }
                    }, error => console.error(`An error has occurred! ${error}`));
            });
    }

    ngOnDestroy(): void {
        this.items = null;
    }

    calculateTotal():number {
        return undefined;
    }

    changeQuantity(id:number, newQuantity): void {
        this.shoppingCartService.changeQuantity(id, newQuantity);
    }

    removeFromShoppingCart(id: number): void {
        this.shoppingCartService.removeFromCart(id);
    }

}

