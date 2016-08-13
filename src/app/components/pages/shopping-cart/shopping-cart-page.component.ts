import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Router }                                          from '@angular/router';
import { HTTP_PROVIDERS }                                  from '@angular/http';
import { NgFor }                                           from '@angular/common';
import { Observable }                                      from 'rxjs/Observable';
import 'rxjs/Rx';

import { Computer } from './../../../models/computer.model';
import { IShoppingCartLocalStorageItem } from './../../../models/shopping-cart.model';

import { ShoppingCartItemComponent } from './shopping-cart-item/shopping-cart-item.component';

import { ApiService }          from './../../../services/api.service';
import { ShoppingCartService } from './../../../services/shopping-cart-service';


interface ICartItem extends Computer {
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

    private items: Observable<ICartItem[]>;
    private total = 0;

    constructor(private apiService: ApiService, private shoppingCartService: ShoppingCartService) {

    }



    public ngOnInit(): void {
        this.shoppingCartService.loadCart();
        this.items = this.shoppingCartService.cartItems;
    }

    public ngOnDestroy(): void {
        this.items = null;
        //TODO find out whether to remove Observables?
    }

    //private calculateTotal(): number {
    //    let total = 0;
    //    this.items.forEach(item => {
    //        total += item.price * item.quantity;
    //    });
    //    return total;
    //}
}

