import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';

import { Router } from '@angular/router';

import { Computer } from './../../../../../models/index';

//TODO Make all the properties private - remove the interface no one else will be using it
interface IStoreItem {
    _id:   number;
    brand: string;
    title: string;
    price: number;
    navigateTo(route: string, id: number): void;
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
    _id: number;
    brand: string;
    title: string;
    price: number;
    
    @Input()  private item: Computer;
    @Output() private remove = new EventEmitter<Computer>();

    constructor(private router: Router){
        
    }

    ngOnInit(): void {
        Object.assign(this, this.item);
    }

    ngOnDestroy():any {
        delete this;
    }

    private removeStoreItem() {
        if(confirm("Do you want to delete the item from store?")) {
            this.remove.emit(this.item);
        }
    }

    public navigateTo(route: string, id): void {
        this.router.navigate([`/${route}`, id]);
    }
}