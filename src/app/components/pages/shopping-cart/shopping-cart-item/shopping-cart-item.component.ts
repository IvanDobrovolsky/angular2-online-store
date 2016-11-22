import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router }                                                 from '@angular/router';

import { Computer } from './../../../../models/index';

import { ShoppingCartService } from './../../../../services/index';

@Component({
    encapsulation: ViewEncapsulation.Emulated,
    selector: 'shopping-cart-item',
    templateUrl: 'shopping-cart-item.component.html',
    styleUrls: [
        'shopping-cart-item.component.css'
    ],
    providers: []
})
export class ShoppingCartItemComponent implements OnInit, OnDestroy{
    private _id: number;
    private brand: string;
    private title: string;
    private price: number;
    private image: string;
    private description: string;
    private quantity = 1;

    @Input() private item: Computer;

    constructor(private router: Router, private shoppingCartService: ShoppingCartService){

    }

    public ngOnInit(): void {
        Object.assign(this, this.item);
    }

    public ngOnDestroy(): any {
        return undefined;
    }

    private removeFromCart(id: number): void {
        if (confirm("Are you sure that you want to remove it from cart?")) {
            this.shoppingCartService.removeFromCart(id);
        }
    }

    private preview(id: number): void {
        this.router.navigate(['/catalog', id]);
        console.log("Toggled preview for " + id);
    }

    private changeQuantity(id:number, newQuantity): void {
        this.quantity = newQuantity;
        this.shoppingCartService.changeQuantity(id, newQuantity);
    }

    private get totalForItem(): number {
        return this.price * this.quantity;
    }
}

