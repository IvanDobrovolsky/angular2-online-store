import { Component, ViewEncapsulation, Input, OnInit, OnDestroy } from '@angular/core';
import { Router }                                                 from '@angular/router';

import { Computer } from './../../../../models/computer.model';

import { ShoppingCartService } from './../../../../services/shopping-cart-service';

interface IShoppingCartItem {
    _id: number;
    brand: string;
    title: string;
    price: number;
    image: string;
    description: string;
    quantity: number;
    preview(id: number): void;
    removeFromCart(id: number): void;
}

@Component({
    moduleId: module.id,
    encapsulation: ViewEncapsulation.Emulated,
    selector: 'shopping-cart-item',
    templateUrl: 'shopping-cart-item.component.html',
    styleUrls: [
        'shopping-cart-item.component.css'
    ],
    providers: [
        ShoppingCartService
    ]
})
export class ShoppingCartItemComponent implements OnInit, OnDestroy, IShoppingCartItem{
    _id: number;
    brand: string;
    title: string;
    price: number;
    image: string;
    description: string;
    quantity: number;

    @Input() private item: Computer;

    constructor(private router: Router, private shoppingCartService: ShoppingCartService){

    }

    ngOnInit(): void {
        Object.assign(this, this.item);
    }

    ngOnDestroy(): any {
        return undefined;
    }

    removeFromCart(id: number): void {
        this.shoppingCartService.removeFromCart(id);
    }

    preview(id: number): void {
        this.router.navigate(['/catalog', id]);
        console.log("Toggled preview for " + id);
    }
}

