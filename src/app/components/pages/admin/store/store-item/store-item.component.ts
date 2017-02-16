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

import { Computer } from '../../../../../../../angular2-online-store/src/app/models/index';

//TODO Make all the properties private - remove the interface no one else will be using it
interface IStoreItem {
    _id:   number;
    brand: string;
    title: string;
    price: number;
}

@Component({
    encapsulation: ViewEncapsulation.Emulated,
    selector: 'store-item',
    templateUrl: 'store-item.component.html',
    styleUrls: [
        'store-item.component.css'
    ],
    providers: []
})
export class StoreItemComponent implements OnInit, OnDestroy, IStoreItem{
    public _id: number;
    public brand: string;
    public title: string;
    public price: number;
    
    @Input()  private item: Computer;
    @Output() private remove = new EventEmitter<Computer>();

    constructor(private router: Router){
        
    }

    public ngOnInit(): void {
        Object.assign(this, this.item);
    }

    public ngOnDestroy():any {
        delete this;
    }

    private removeStoreItem() {
        if(confirm("Do you want to delete the item from store?")) {
            this.remove.emit(this.item);
        }
    }

    private navigateTo(route: string, id): void {
        this.router.navigate([`/${route}`, id]);
    }
}