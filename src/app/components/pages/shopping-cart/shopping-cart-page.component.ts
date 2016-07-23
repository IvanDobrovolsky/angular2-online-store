import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Router }                                          from '@angular/router';
import { HTTP_PROVIDERS }                                  from '@angular/http';
import { NgFor }                                           from '@angular/common';

import { Computer } from './../../../models/computer.model';

import { ShoppingCartItemComponent } from './shopping-cart-item/shopping-cart-item.component';

interface IShoppingCart {
    calculateTotal(): number;
    increaseQuantity(id: number): void;
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
    providers: [
        HTTP_PROVIDERS
    ]
})
export class ShoppingCartComponent implements OnInit, OnDestroy, IShoppingCart{

    private items: Computer[];

    ngOnInit():any {
        return undefined;
    }

    ngOnDestroy():any {
        return undefined;
    }

    calculateTotal():number {
        return undefined;
    }

    increaseQuantity(id:number): void {
    }

    removeFromShoppingCart(id:number):void {
    }

}

