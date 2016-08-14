import { Component, ViewEncapsulation, OnInit, OnDestroy}              from '@angular/core';
import { Router }                                                      from '@angular/router';
import { Subscription }                                                from 'Rxjs'

import { Computer }   from './../../../../models/index';

import { ApiService }          from './../../../../services/api.service';
import { SubscriptionService } from './../../../../services/subscription.service';

import { ComputerFormComponent } from './../../../shared/index';

//TODO Add Allow deactivation only if the form is submitted
//TODO Add authentication

@Component({
    moduleId: module.id,
    encapsulation: ViewEncapsulation.Emulated,
    selector: 'admin-create',
    templateUrl: 'admin-create.component.html',
    styleUrls: [
        'admin-create.component.css'
    ],
    directives: [
        ComputerFormComponent
    ],
    providers: []
})
export class AdminCreateComponent implements OnInit, OnDestroy {

    private subscriptions: Array<Subscription> = [];

    constructor(
        private apiService: ApiService,
        private subscriptionService: SubscriptionService,
        private router: Router
    ) {}

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
        this.subscriptionService.unsubscribeFromAllObservables(this.subscriptions);
    }

    private createComputer(computer: Computer) {

        const apiServiceSubscription = this.apiService
            .createNewComputer(computer)
            .subscribe(response => {
                    if(response.success){
                        //TODO add notification from NotificationService
                        console.log(response.message);
                        this.router.navigate(['/admin']);
                    }
                },
                error => console.error(`An error has occurred! ${error}`));
        this.subscriptions.push(apiServiceSubscription);
    }
}