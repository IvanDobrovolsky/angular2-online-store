import { Component, ViewEncapsulation, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { NgIf, NgFor, NgClass }                                                  from '@angular/common';

import { ApiService } from './../../../../services/api.service';
import { Computer }   from "../../../../models/computer.model";
import { IFilters }   from "../../../../models/filters.model";


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

    @Output() private onFilter = new EventEmitter<Computer[]>();

    private filters: IFilters = {price: {from: 0, to: 3000}, brands: []};

    constructor(private apiService: ApiService){

    }

    ngOnInit(): void {
        this.apiService.getAllBrandNames()
            .subscribe(response => {
                    if(response.success){
                        this.brandNames = response.data;
                        this.filters.brands = this.brandNames;
                    }
                },
                error => console.error(`An error has occurred! ${error}`));
    }

    ngOnDestroy(): void {
        //Destroying the component's data
        this.filters = null;
        this.brandNames = null;
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

    private filterComputers(): void{
        if (this.isFormValid) {
            this.apiService
                .findComputers(this.filters)
                .subscribe(response => {
                        if(response.success){
                            let filteredComputers = response.data;

                            //Firing the event to the parent component
                            this.onFilter.emit(filteredComputers);
                        }
                    },
                    error => console.error(`An error has occurred! ${error}`));
        } else {
            console.log("Filters are invalid...");
        }
    }
}

