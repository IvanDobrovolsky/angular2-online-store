import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { NgIf, NgFor }                                     from '@angular/common';
import { HTTP_PROVIDERS }                                  from '@angular/http';

//Computer model
import { Computer } from './../../../models/computer.model';

//Api service
import { ApiService } from './../../../services/api.service';

//Application components
import { StoreItemComponent } from './store-item/store-item.component';

@Component({
    moduleId: module.id,
    encapsulation: ViewEncapsulation.Emulated,
    selector: 'admin-page',
    templateUrl: 'admin-page.component.html',
    styleUrls: [
        'admin-page.component.css'
    ],
    directives: [
        NgIf,
        NgFor,
        StoreItemComponent
    ],
    providers: [
        HTTP_PROVIDERS
    ]
})
export class AdminPageComponent implements OnInit, OnDestroy{

    private storeItems: Array<Computer>;

    constructor(private apiService: ApiService){}

    ngOnInit(): void {
        this.apiService
            .getAllComputers()
            .subscribe(response => {
                    if(response.success){
                        this.storeItems = response.data;
                    }
                },
                error => console.error(`An error has occurred! ${error}`));
    }

    ngOnDestroy(): void {
        this.storeItems = [];
    }

    private isEmptyStore(): boolean {
        return !!this.storeItems && this.storeItems.length === 0;
    }

    private removeFromStore(storeItem: Computer): void {
        let index = this.storeItems.indexOf(storeItem);
        
        //Removing the item not mutating the data
        this.storeItems = [...this.storeItems.slice(0, index), ...this.storeItems.slice(index+1)];

        //Removing from backend
        this.apiService.removeComputer(storeItem._id)
            .subscribe(response => {
                    if(response.success){
                        console.log("Removed from DB!");
                    }
                },
                error => console.error(`An error has occurred! ${error}`));
    }
}