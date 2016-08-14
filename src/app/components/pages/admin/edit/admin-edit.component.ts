import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';

import { Computer }   from './../../../../models/computer.model';

import { ApiService } from './../../../../services/api.service';

import { ComputerFormComponent } from './../../../shared/forms/computer-form/computer-form.component';

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

    constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute, private router: Router) {

    }

    ngOnInit(): void {
        console.log('ngOnInit in parent');
        this.activatedRoute.params.subscribe(params => {

            let id = params['id'];

            this.apiService.getComputerById(id)
                .subscribe(response => {
                        if(response.success){

                            this.itemToUpdate = response.data[0];
                        }
                    },
                    error => console.error(`An error has occurred! ${error}`));
        });
    }

    ngOnDestroy(): void {
       //TODO Unsubscribe from all observables!
    }

    private updateComputer(id: number, computer: Computer) {

         this.apiService
             .updateComputer(id, computer)
             .subscribe(response => {
                     if(response.success){
                         console.log(response.message);
                         this.router.navigate(['/admin']);
                     }
                 },
                 error => console.error(`An error has occurred! ${error}`));
    }
}