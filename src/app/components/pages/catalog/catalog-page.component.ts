import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { NgIf, NgFor }                                     from '@angular/common';
import { Subscription }                                    from 'Rxjs'

//Computer model
import { Computer } from './../../../models/computer.model';

//Api service
import { ApiService }          from './../../../services/api.service';
import { SubscriptionService } from './../../../services/subscription.service';


//Application catalog components
import { CatalogItemComponent }    from './catalog-item/catalog-item.component';
import { CatalogFiltersComponent } from './catalog-filters/catalog-filters.component';

@Component({
    moduleId: module.id,
    encapsulation: ViewEncapsulation.Emulated,
    selector: 'catalog-page',
    templateUrl: 'catalog-page.component.html',
    styleUrls: [
        'catalog-page.component.css'
    ],
    directives: [
        NgIf,
        NgFor,
        CatalogItemComponent,
        CatalogFiltersComponent
    ],
    providers: []
})
export class CatalogPageComponent implements OnInit, OnDestroy{

    private computers: Array<Computer>;

    private subscriptions: Array<Subscription> = [];

    constructor(
        private apiService: ApiService,
        private subscriptionService: SubscriptionService
    ){}

    isEmptyCatalog(): boolean{
        return !!this.computers && this.computers.length === 0;
    }

    ngOnInit(): void {
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

    ngOnDestroy(): void {
        this.subscriptionService.unsubscribeFromAllObservables(this.subscriptions);
    }

    filterCatalogItems(updatedData){
        this.computers = updatedData;
    }

}

