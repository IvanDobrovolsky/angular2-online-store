import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { HTTP_PROVIDERS }                                  from '@angular/http';

//Computer model
import { Computer } from './../../../models/computer.model';

//Api service
import { ApiService } from './../../../services/api.service';

@Component({
    moduleId: module.id,
    encapsulation: ViewEncapsulation.Emulated,
    selector: 'catalog-page',
    templateUrl: 'catalog-page.component.html',
    styleUrls: [
        'catalog-page.component.css'
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
                        console.log(this.computers);
                    }
                },
                error => console.error(`An error has occurred! ${error}`));
    }

    ngOnDestroy(): void {
        this.computers = [];
    }

}

