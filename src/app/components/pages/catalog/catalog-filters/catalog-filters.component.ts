import { Component, ViewEncapsulation, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { NgIf, NgFor, NgClass }                                                  from '@angular/common';
import { Subscription }                                                          from 'Rxjs'

import { ApiService, SubscriptionService } from './../../../../services/index';

import { Computer, IFilters } from "../../../../models/index";

@Component({
    moduleId: module.id,
    encapsulation: ViewEncapsulation.Emulated,
    selector: 'catalog-filters',
    templateUrl: 'catalog-filters.component.html',
    styleUrls: [
        'catalog-filters.component.css'
    ],
    directives: [
        NgIf,
        NgFor,
        NgClass
    ],
    providers: []
})
export class CatalogFiltersComponent implements OnInit, OnDestroy{

    private brandNames: Array<string> = [];

    private subscriptions: Array<Subscription> = [];

    @Output() private onFilter = new EventEmitter<Computer[]>();

    //Default filter/sort values
    private filters: IFilters = {price: {from: 0, to: 3000}, brands: []};
    private sorters = {byPrice: false, byDate: false};

    constructor(
        private apiService: ApiService,
        private subscriptionService: SubscriptionService
    ){}

    ngOnInit(): void {
        const apiServiceSubscription = this.apiService
            .getAllBrandNames()
            .subscribe(response => {
                    if(response.success){
                        this.brandNames = response.data;
                        this.filters.brands = this.brandNames;
                    }
                },
                error => console.error(`An error has occurred! ${error}`));

        this.subscriptions.push(apiServiceSubscription);
    }

    ngOnDestroy(): void {
        this.subscriptionService.unsubscribeFromAllObservables(this.subscriptions);
    }

    private get arePricesValid (): boolean {
        const {from, to} = this.filters.price;
        return from !== null && to !== null && !Number.isNaN(from * to) && (from * to) >=0 && (from < to);
    }

    private get areBrandsValid (): boolean {
        return this.filters.brands.length >= 1;
    }
    
    private get isFormValid(): boolean {
        return this.arePricesValid && this.areBrandsValid;
    }

    private handleCheckBoxCheck(brand: string): void{

        let index = this.filters.brands.indexOf(brand);

        if(index !== -1 && this.filters.brands.length !== 0) {
            //Not mutating the existing array
            this.filters.brands = [...this.filters.brands.slice(0, index), ...this.filters.brands.slice(index+1)];
        } else {
            this.filters.brands.push(brand);
        }

    }

    private static sortByPrice(computers): Computer[] {
        //Immutable sort
        return [...computers].sort((c1: Computer, c2: Computer) => c1.price - c2.price);
    }

    private static sortByDate(computers): Computer[] {
        //Immutable sort
        return [...computers].sort((c1: Computer, c2: Computer) => c2.date - c1.date);
    }

    private filterComputers(): void{
        if (this.isFormValid) {

            const apiServiceSubscription = this.apiService
                .findComputers(this.filters)
                .subscribe(response => {
                        if(response.success){
                            let filteredComputers = response.data;

                            //Sorting by price
                            if(this.sorters.byPrice) {
                                filteredComputers = CatalogFiltersComponent.sortByPrice(filteredComputers);
                            }

                            //Sorting by date
                            if(this.sorters.byDate) {
                                filteredComputers = CatalogFiltersComponent.sortByDate(filteredComputers);
                            }
                            
                            this.onFilter.emit(filteredComputers);
                        }
                    },
                    error => console.error(`An error has occurred! ${error}`));

            this.subscriptions.push(apiServiceSubscription);
        } else {
            console.log("Filters are invalid...");
        }
    }
}

