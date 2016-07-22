import { Component, ViewEncapsulation, Input, OnInit, OnDestroy } from '@angular/core';

import { Computer } from './../../../../models/computer.model';

interface ICatalogItem {
    brand: string;
    title: string;
    price: number;
    imageUrl: string;
    description: string;
    preview(id: string): void;
    addToCart(id: string): void;
}

@Component({
    moduleId: module.id,
    encapsulation: ViewEncapsulation.Emulated,
    selector: 'catalog-item',
    templateUrl: 'catalog-item.component.html',
    styleUrls: [
        'catalog-item.component.css'
    ]
})
export class CatalogItemComponent implements OnInit, OnDestroy, ICatalogItem{
    brand: string;
    title: string;
    price: number;
    imageUrl: string;
    description: string;

    @Input() private item: Computer;

    constructor(){}

    ngOnInit():any {
        this.brand = this.item.brand;
        this.title = this.item.title;
        this.price = this.item.price;
        this.imageUrl = this.item.image;
        this.description = this.item.description;
    }

    ngOnDestroy():any {
        delete this;
    }

    preview(id:string):void {
        console.log("Toggled preview for " + id);
    }

    addToCart(id:string):void {
        console.log(id + " Added to cart!");
    }
}

