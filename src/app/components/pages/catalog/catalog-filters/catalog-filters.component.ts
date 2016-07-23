import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { NgIf, NgFor }                                     from '@angular/common';

import { ApiService } from './../../../../services/api.service';

interface ICatalogFilters {
    brandNames: Array<string>;
}

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
        NgFor
    ]
})
export class CatalogFiltersComponent implements OnInit, OnDestroy{

    //TODO implement filtering functionality

    public brandNames: Array<string> = [];

    constructor(private apiService: ApiService){

    }

    ngOnInit(): void {
        this.apiService.getAllBrandNames()
            .subscribe(response => {
                    if(response.success){
                        this.brandNames = response.data;
                    }
                },
                error => console.error(`An error has occurred! ${error}`));
    }

    ngOnDestroy(): void {

    }

}

