import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { NgIf, NgFor }                                     from '@angular/common';
import { HTTP_PROVIDERS }                                  from '@angular/http';

//Computer model
import { Computer } from './../../../models/computer.model';

//Api service
import { ApiService } from './../../../services/api.service';

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
    providers: [
        HTTP_PROVIDERS,
        ApiService
    ]
})
export class CatalogPageComponent implements OnInit, OnDestroy{

    private computers: Array<Computer>;

    constructor(private apiService: ApiService){}

    isEmptyCatalog(): boolean{
        return !!this.computers && this.computers.length === 0;
    }

    ngOnInit(): void {
        this.apiService
            .getAllComputers()
            .subscribe(response => {
                    if(response.success){
                        this.computers = response.data;
                    }
                },
                error => console.error(`An error has occurred! ${error}`));
    }

    ngOnDestroy(): void {
        this.computers = [];
    }

    filterCatalogItems(updatedData){
        this.computers = updatedData;
    }

}

