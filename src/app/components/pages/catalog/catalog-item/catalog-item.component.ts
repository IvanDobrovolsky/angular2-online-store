import { Component, ViewEncapsulation, Input, OnInit, OnDestroy } from '@angular/core';
import { Router }                                                 from '@angular/router';

import { Computer } from './../../../../models/computer.model';

import { ShoppingCartService } from "../../../../services/shopping-cart-service";

interface ICatalogItem {
    brand: string;
    title: string;
    price: number;
    image: string;
    description: string;
    preview(id: number): void;
    addToCart(id: number): void;
}

@Component({
    moduleId: module.id,
    encapsulation: ViewEncapsulation.Emulated,
    selector: 'catalog-item',
    templateUrl: 'catalog-item.component.html',
    styleUrls: [
        'catalog-item.component.css'
    ],
    providers: [
        ShoppingCartService
    ]
})
export class CatalogItemComponent implements OnInit, OnDestroy, ICatalogItem{
    brand: string;
    title: string;
    price: number;
    image: string;
    description: string;

    @Input() private item: Computer;

    constructor(private router: Router, private shoppingCartService: ShoppingCartService){

    }

    ngOnInit(): void {
        Object.assign(this, this.item);
    }

    ngOnDestroy():any {
        delete this;
    }

    preview(id: number):void {
        this.router.navigate(['/catalog', id]);
    }

    addToCart(id: number):void {
        this.shoppingCartService.addToCart(id);
        console.log(id + " Added to cart!");
    }
}

