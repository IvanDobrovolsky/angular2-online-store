import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Router }                                          from '@angular/router';
import { HTTP_PROVIDERS }                                  from '@angular/http';
import { NgFor }                                           from '@angular/common';
import { Observable }                                      from 'rxjs/Observable';
import 'rxjs/Rx';

import { Computer } from './../../../models/computer.model';
import { IShoppingCartItem } from './../../../models/shopping-cart.model';

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

    private items: Array<ICartItem> = [];
    private total = 0;

    constructor(private apiService: ApiService, private shoppingCartService: ShoppingCartService) {

    }

    private isItemInCart(item: ICartItem) {
        return this.items.indexOf(item) >= 0;
    }

    public ngOnInit(): void {


        let shoppingCartCache = {};

        const cacheData = (item: IShoppingCartItem) =>  {


                //Putting the item into cache
                shoppingCartCache[item._id] = item.quantity;

            return item;
        };

        const fetchDataFromServer = (item: IShoppingCartItem) => this.apiService.getComputerById(item._id);
        const isNotCached = (item: IShoppingCartItem) => shoppingCartCache[item._id] === undefined;

        console.log(shoppingCartCache);

        //TODO Refactor the implementation
        //TODO fix caching mechanism

        //noinspection TypeScriptUnresolvedFunction
        this.shoppingCartService
            .cartItems
            .map(cacheData)
            //.filter(isNotCached)
            .flatMap(fetchDataFromServer)
            .subscribe(response => {
                if (response.success) {
                   const computer: Computer = response.data[0];
                   const quantity = shoppingCartCache[computer._id];
                    
                   const cartItem = Object.assign({}, computer, {quantity});
                    if(!this.isItemInCart(cartItem)) {
                        this.items.push(cartItem);
                        this.total = this.calculateTotal();
                    }
                }
            }, error => console.error(`An error has occurred! ${error}`));
        this.shoppingCartService.load();
    }

    public ngOnDestroy(): void {
        this.items = null;

        //TODO find out whether to remove Observables?
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
        //this.shoppingCartService.changeQuantity(id, newQuantity);
        this.total = this.calculateTotal();
    }

}

