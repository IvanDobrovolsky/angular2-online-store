import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { Subscription } from 'Rxjs'
import { Computer }     from './../../../../models/index';

import { ApiService }          from './../../../../services/api.service';
import { SubscriptionService } from './../../../../services/subscription.service';

import { ComputerFormComponent } from './../../../shared/index';

@Component({
    moduleId: module.id,
    encapsulation: ViewEncapsulation.Emulated,
    selector: 'admin-edit',
    templateUrl: 'admin-edit.component.html',
    styleUrls: [
        'admin-edit.component.css'
    ],
    directives: [
        ComputerFormComponent
    ],
    providers: []
})
export class AdminEditComponent implements OnInit, OnDestroy{

    private itemToUpdate: any;
    private title: string;

    private subscriptions: Array<Subscription> = [];

    constructor(
        private apiService: ApiService,
        private activatedRoute: ActivatedRoute,
        private subscriptionService: SubscriptionService,
        private router: Router
    ) {}

    ngOnInit(): void {
        const routerSubscription = this.activatedRoute.params.subscribe(params => {

            let id = params['id'];

            const apiServiceSubscription = this.apiService.getComputerById(id)
                .subscribe(response => {
                        if (response.success) {
                            this.itemToUpdate = response.data[0];
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

    private updateComputer(id: number, computer: Computer) {

         const apiServiceSubscription = this.apiService
             .updateComputer(id, computer)
             .subscribe(response => {
                     if(response.success){
                         console.log(response.message);
                         this.router.navigate(['/admin']);
                     }
                 },
                 error => console.error(`An error has occurred! ${error}`));

         this.subscriptions.push(apiServiceSubscription);
    }
}