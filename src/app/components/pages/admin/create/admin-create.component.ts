import {Component, ViewEncapsulation, OnInit, OnDestroy}              from '@angular/core';
import { Router }                                                     from '@angular/router';

import { Computer }   from './../../../../models/computer.model';

import { ApiService } from './../../../../services/api.service';

import { ComputerFormComponent } from './../../../shared/forms/computer-form/computer-form.component';

//TODO Add Allow deactivation only if the form is submitted

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
export class AdminCreateComponent{
    
    constructor(private apiService: ApiService, private router: Router) {
        
    }
    private createComputer(computer: Computer) {

        this.apiService
            .createNewComputer(computer)
            .subscribe(response => {
                    if(response.success){
                        //TODO add notification from NotificationService
                        console.log(response.message);
                        this.router.navigate(['/admin']);
                    }
                },
                error => console.error(`An error has occurred! ${error}`));
    }
}