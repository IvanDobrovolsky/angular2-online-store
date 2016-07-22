import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ROUTER_DIRECTIVES }               from '@angular/router';
import { HTTP_PROVIDERS }                                  from '@angular/http';
import { NgFor }                                           from '@angular/common';

import { Computer } from './../../../../models/computer.model';

import { ApiService } from './../../../../services/api.service';


interface ICatalogItemPreview {
    brand: string;
    title: string;
    price: number;
    image: string;
    description: string;
    details: Array<string>;
    date: number;
    addToCart(id: string): void;
}

@Component({
    moduleId: module.id,
    encapsulation: ViewEncapsulation.Emulated,
    selector: 'catalog-item-preview',
    templateUrl: 'catalog-item-preview.component.html',
    styleUrls: [
        'catalog-item-preview.component.css'
    ],
    directives: [
        ROUTER_DIRECTIVES,
        NgFor
    ],
    providers: [
        HTTP_PROVIDERS,
        ApiService
    ]
})
export class CatalogItemPreview implements OnInit, OnDestroy, ICatalogItemPreview{
    brand: string;
    title: string;
    price: number;
    image: string;
    description: string;
    details: Array<string>;
    date: number;

    private previewItem: Computer;

    constructor(private apiService: ApiService, private route: ActivatedRoute){

    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {

            let id = params['id'];

            this.apiService.getComputerById(id)
                .subscribe(response => {
                        if(response.success){

                            this.previewItem = response.data[0];

                            Object.assign(this, this.previewItem);
                        }
                    },
                    error => console.error(`An error has occurred! ${error}`));
        });

    }

    ngOnDestroy(): void {
        return undefined;
    }

    addToCart(id: string): void {
        console.log(`Adding ${id} to the cart!`);
    }

}

