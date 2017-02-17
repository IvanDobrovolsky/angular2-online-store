import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
    @Output() public remove = new EventEmitter<Computer>();

    constructor(private router: Router){

    }

    public ngOnInit (): void {
        console.log(this.item.title);
    }

    public removeFromCart(): void {
        if (confirm("Are you sure that you want to remove it from cart?")) {
            this.remove.emit(this.item);
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

