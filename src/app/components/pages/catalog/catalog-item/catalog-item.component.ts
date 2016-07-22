import { Component, ViewEncapsulation, Input, OnInit, OnDestroy } from '@angular/core';
import { Router }                                                 from '@angular/router';

import { Computer } from './../../../../models/computer.model';

interface ICatalogItem {
    brand: string;
    title: string;
    price: number;
    image: string;
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
    image: string;
    description: string;

    @Input() private item: Computer;

    constructor(private router: Router){

    }

    ngOnInit(): void {
        Object.assign(this, this.item);
    }

    ngOnDestroy():any {
        delete this;
    }

    preview(id: string):void {
        this.router.navigate(['/catalog', id])
        console.log("Toggled preview for " + id);
    }

    addToCart(id: string):void {
        console.log(id + " Added to cart!");
    }
}

