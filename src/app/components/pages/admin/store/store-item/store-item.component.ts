import { Component,
    ViewEncapsulation,
    Input,
    Output,
    OnInit,
    OnDestroy,
    EventEmitter} from '@angular/core';
import { Router } from '@angular/router';

import { Computer } from './../../../../../models/computer.model';

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
    @Output() private onRemove = new EventEmitter<Computer>();

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
            this.onRemove.emit(this.item);
        }
    }

    public navigateTo(route: string, id): void {
        this.router.navigate([`/${route}`, id]);
    }
}