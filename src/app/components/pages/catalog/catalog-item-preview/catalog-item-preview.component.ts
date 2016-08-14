import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ROUTER_DIRECTIVES }               from '@angular/router';
import { NgFor }                                           from '@angular/common';
import { Subscription }                                    from 'Rxjs'

import { Computer } from './../../../../models/computer.model';

import { ApiService }          from './../../../../services/api.service';
import { SubscriptionService } from './../../../../services/subscription.service';

//TODO remove interfaces and make the props and methods private
interface ICatalogItemPreview {
    brand: string;
    title: string;
    price: number;
    image: string;
    description: string;
    details: Array<string>;
    date: number;
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
    providers: []
})
export class CatalogItemPreviewComponent implements OnInit, OnDestroy, ICatalogItemPreview{
    brand: string;
    title: string;
    price: number;
    image: string;
    description: string;
    details: Array<string>;
    date: number;

    private previewItem: Computer;
    private subscriptions: Array<Subscription> = [];

    constructor(
        private apiService: ApiService,
        private subscriptionService: SubscriptionService,
        private route: ActivatedRoute
    ){}

    ngOnInit(): void {
        const routerSubscription = this.route.params.subscribe(params => {

            let id = params['id'];

            const apiServiceSubscription = this.apiService
                .getComputerById(id)
                .subscribe(response => {
                        if(response.success){

                            this.previewItem = response.data[0];

                            Object.assign(this, this.previewItem);
                        }
                    },
                    error => console.error(`An error has occurred! ${error}`));
            this.subscriptions.push(apiServiceSubscription);
        });

        this.subscriptions.push(routerSubscription);
    }

    ngOnDestroy(): void {
        this.subscriptionService.unsubscribeFromAllObservables(this.subscriptions);
    }
}

