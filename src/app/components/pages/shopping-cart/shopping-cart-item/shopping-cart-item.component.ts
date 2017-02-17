import { Component, Input, OnInit } from '@angular/core';
import { Router }           from '@angular/router';

import { Computer } from '../../../../models';

@Component({
    selector: 'shopping-cart-item',
    templateUrl: 'shopping-cart-item.component.html',
    styleUrls: [
        'shopping-cart-item.component.css'
    ],
    providers: []
})
export class ShoppingCartItemComponent implements OnInit {

    @Input() public item: Computer;

    constructor(private router: Router){

    }

    public ngOnInit (): void {
        console.log(this.item.title);
    }

    public removeFromCart(id: number): void {
        if (confirm("Are you sure that you want to remove it from cart?")) {
            // this.shoppingCartService.removeFromCart(id);
        }
    }

    public preview(id: number): void {
        this.router.navigate(['/catalog', id]);
    }

    public changeQuantity(id:number, newQuantity): void {
        // this.quantity = newQuantity;
        // this.shoppingCartService.changeQuantity(id, newQuantity);
    }
}

