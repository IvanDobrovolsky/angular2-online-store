import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { NgFor, NgIf }                                     from '@angular/common';
import { Subscription }                                    from 'Rxjs'

//Computer model
import { Computer } from '../../../../../angular2-online-store/src/app/models/index';

//Api service
import { ApiService, SubscriptionService } from '../../../../../angular2-online-store/src/app/services/index';

//Application catalog components
import { CatalogItemComponent }    from './catalog-item/catalog-item.component';
import { CatalogFiltersComponent } from './catalog-filters/catalog-filters.component';

@Component({
    encapsulation: ViewEncapsulation.Emulated,
    selector: 'catalog-page',
    templateUrl: 'catalog-page.component.html',
    styleUrls: [
        'catalog-page.component.css'
    ]
})
export class CatalogPageComponent implements OnInit, OnDestroy{

    private computers: Array<Computer>;

    private subscriptions: Array<Subscription> = [];

    constructor(
        private apiService: ApiService,
        private subscriptionService: SubscriptionService
    ){}

    public ngOnInit(): void {
        const apiServiceSubscription = this.apiService
            .getAllComputers()
            .subscribe(response => {
                    if(response.success){
                        this.computers = response.data;
                    }
                },
                error => console.error(`An error has occurred! ${error}`));

        this.subscriptions.push(apiServiceSubscription);
    }

    public ngOnDestroy(): void {
        this.subscriptionService.unsubscribeFromAllObservables(this.subscriptions);
    }

    private filterCatalogItems(updatedData){
        this.computers = updatedData;
    }

    private isEmptyCatalog(): boolean{
        return !!this.computers && this.computers.length === 0;
    }
}

