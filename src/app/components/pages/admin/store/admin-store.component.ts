import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES }                               from '@angular/router';
import { NgIf, NgFor }                                     from '@angular/common';
import { Subscription }                                    from 'Rxjs'

//Computer model
import { Computer } from './../../../../models/computer.model';

//Api service
import { ApiService } from './../../../../services/api.service';
import { SubscriptionService } from './../../../../services/subscription.service';

//Application components
import { StoreItemComponent } from './store-item/store-item.component';

@Component({
    moduleId: module.id,
    encapsulation: ViewEncapsulation.Emulated,
    selector: 'admin-store',
    templateUrl: 'admin-store.component.html',
    styleUrls: [
        'admin-store.component.css'
    ],
    directives: [
        ROUTER_DIRECTIVES,
        NgIf,
        NgFor,
        StoreItemComponent
    ],
    providers: []
})
export class AdminStoreComponent implements OnInit, OnDestroy{

    private storeItems:    Computer[];
    private subscriptions: Array<Subscription> = [];

    constructor(
        private apiService: ApiService,
        private subscriptionService: SubscriptionService
    ){}

    ngOnInit(): void {
        const apiServiceSubscription = this.apiService
            .getAllComputers()
            .subscribe(response => {
                    if(response.success){
                        this.storeItems = response.data;
                    }
                },
                error => console.error(`An error has occurred! ${error}`));

        this.subscriptions.push(apiServiceSubscription);
    }

    ngOnDestroy(): void {
        this.subscriptionService.unsubscribeFromAllObservables(this.subscriptions);
    }

    private isEmptyStore(): boolean {
        return !!this.storeItems && this.storeItems.length === 0;
    }

    private removeFromStore(storeItem: Computer): void {
        let index = this.storeItems.indexOf(storeItem);

        //Removing the item not mutating the data
        this.storeItems = [...this.storeItems.slice(0, index), ...this.storeItems.slice(index+1)];

        //Removing from backend
        const apiServiceSubscription = this.apiService
            .removeComputer(storeItem._id)
            .subscribe(response => {
                    if(response.success){
                        console.log("Removed from DB!");
                    }
                },
                error => console.error(`An error has occurred! ${error}`));

        this.subscriptions.push(apiServiceSubscription);
    }
}