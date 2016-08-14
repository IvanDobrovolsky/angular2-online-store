import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Router }                                          from '@angular/router';
import { HTTP_PROVIDERS }                                  from '@angular/http';
import { NgFor }                                           from '@angular/common';
import { Observable }                                      from 'rxjs/Observable';
import 'rxjs/Rx';

import { ICartProductItem } from './../../../models/shopping-cart.model';

import { ShoppingCartItemComponent } from './shopping-cart-item/shopping-cart-item.component';

import { ApiService }          from './../../../services/api.service';
import { ShoppingCartService } from './../../../services/shopping-cart-service';

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

    private items: Observable<ICartProductItem[]>;
    private total: number;

    constructor(
        private apiService: ApiService,
        private shoppingCartService: ShoppingCartService
    ) {}


    public ngOnInit(): void {
        this.shoppingCartService.loadCart();
        this.items = this.shoppingCartService.cartItemsStream;
        //noinspection TypeScriptUnresolvedFunction
        this.shoppingCartService.cartItemsStream.subscribe(data => this.calculateTotal(data));
    }

    private calculateTotal(items) {
        let result = 0;
        for (let item of items) {
            result += item.price * item.quantity;
        }
        this.total = result;
    }


    public ngOnDestroy(): void {
        this.items = null;
        //TODO find out whether to remove Observables?
    }
}

