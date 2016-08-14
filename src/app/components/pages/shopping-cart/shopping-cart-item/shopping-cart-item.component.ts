import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router }                                                 from '@angular/router';

import { Computer } from './../../../../models/index';

import { ShoppingCartService } from './../../../../services/index';

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
    changeQuantity(id: number, newQuantity: number): void;
}

//TODO Refactor the implementation
@Component({
    moduleId: module.id,
    encapsulation: ViewEncapsulation.Emulated,
    selector: 'shopping-cart-item',
    templateUrl: 'shopping-cart-item.component.html',
    styleUrls: [
        'shopping-cart-item.component.css'
    ],
    providers: []
})
export class ShoppingCartItemComponent implements OnInit, OnDestroy, IShoppingCartItem{
    _id: number;
    brand: string;
    title: string;
    price: number;
    image: string;
    description: string;
    quantity = 1;

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
        if (confirm("Are you sure that you want to remove it from cart?")) {
            this.shoppingCartService.removeFromCart(id);
        }
    }

    preview(id: number): void {
        this.router.navigate(['/catalog', id]);
        console.log("Toggled preview for " + id);
    }

    changeQuantity(id:number, newQuantity): void {
        this.quantity = newQuantity;
        this.shoppingCartService.changeQuantity(id, newQuantity);
    }

    private get totalForItem(): number {
        return this.price * this.quantity;
    }
}

