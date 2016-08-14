import { Component,Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import { Router }                                                 from '@angular/router';

import { Computer } from './../../../../models/index';

import { ShoppingCartService } from "../../../../services/index";

//TODO Remove interface and make the properties private
interface ICatalogItem {
    brand: string;
    title: string;
    price: number;
    image: string;
    description: string;
    date: number;
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
    providers: []
})
export class CatalogItemComponent implements OnInit, OnDestroy, ICatalogItem{
    brand: string;
    title: string;
    price: number;
    image: string;
    date:  number;
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

    public preview(id: number): void {
        this.router.navigate(['/catalog', id]);
    }

    public addToCart(id: number): void {
        this.shoppingCartService.addToCart(id);
    }
}

