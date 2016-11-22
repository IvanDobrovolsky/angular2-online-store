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
    encapsulation: ViewEncapsulation.Emulated,
    selector: 'catalog-item',
    templateUrl: 'catalog-item.component.html',
    styleUrls: [
        'catalog-item.component.css'
    ],
    providers: []
})
export class CatalogItemComponent implements OnInit, OnDestroy, ICatalogItem{
    public brand: string;
    public title: string;
    public price: number;
    public image: string;
    public date:  number;
    public description: string;

    @Input() private item: Computer;

    constructor(private router: Router, private shoppingCartService: ShoppingCartService){

    }

    public ngOnInit(): void {
        Object.assign(this, this.item);
    }

    public ngOnDestroy():any {
        delete this;
    }

    public addToCart(id: number): void {
        this.shoppingCartService.addToCart(id);
    }

    public preview(id: number): void {
        this.router.navigate(['/catalog', id]);
    }
}

