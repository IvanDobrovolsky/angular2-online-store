import { Component, ViewEncapsulation, Input, OnInit, OnDestroy } from '@angular/core';
import { Router }                                                 from '@angular/router';

import { Computer } from './../../../../models/computer.model';

interface IStoreItem {
    brand: string;
    title: string;
    price: number;
    preview(id: number): void;
}

@Component({
    moduleId: module.id,
    encapsulation: ViewEncapsulation.Emulated,
    selector: 'store-item',
    templateUrl: 'store-item.component.html',
    styleUrls: [
        'store-item.component.css'
    ],
    providers: []
})
export class StoreItemComponent implements OnInit, OnDestroy, IStoreItem{
    brand: string;
    title: string;
    price: number;
    
    @Input() private item: Computer;

    constructor(private router: Router){
        console.log(this.item);
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
}