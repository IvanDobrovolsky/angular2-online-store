import {Component, ViewEncapsulation, OnInit, OnDestroy, Input, Output, EventEmitter}   from '@angular/core';
import {FormGroup, FormBuilder, REACTIVE_FORM_DIRECTIVES, Validators}                   from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router }  from '@angular/router';

import { Computer }   from './../../../models/computer.model';

//TODO Allow deactivation only if the form is submitted

//In the form all fields are treated as strings
interface IInitialFormValues {
    title: string;
    brand: string
    price: string;
    image: string;
    details: string;
    description: string;
}

@Component({
    moduleId: module.id,
    encapsulation: ViewEncapsulation.Emulated,
    selector: 'computer-form',
    templateUrl: 'computer-form.component.html',
    styleUrls: [
        'computer-form.component.css'
    ],
    directives: [
        REACTIVE_FORM_DIRECTIVES,
        NgClass
    ],
    providers: []
})
export class ComputerFormComponent implements OnInit, OnDestroy{

    @Input()  private action: string;
    @Input()  private itemToUpdate: Computer;
    @Output() private onSubmit = new EventEmitter<Computer>();
    
    private computerForm: FormGroup;
    private initialFormValues: IInitialFormValues = {
        title: '',
        brand: '',
        price: '',
        image: '',
        description: '',
        details: ''
    };
    private isSubmitted = false;

    private static pricePattern = "^([1-9]|[0-9][0-9]|[0-9][0-9][0-9]|[0-9][0-9][0-9][0-9])$";
    private static imageUrlPattern = "(https?:\/\/.*\.(?:png|jpg|jpeg|gif))";
    private static CSVPattern = `(?:'[^']*')|(?:[^, ]+)`;

    constructor(private formBuilder: FormBuilder, private router: Router) {

    }

    ngOnInit(): void {

        switch (this.action) {
            case 'update': //Setting initial values
                if(!!this.itemToUpdate) {
                    this.initialFormValues = {
                        title: this.itemToUpdate.title,
                        brand: this.itemToUpdate.brand,
                        price: String(this.itemToUpdate.price),
                        image: this.itemToUpdate.image,
                        description: this.itemToUpdate.description,
                        details: this.itemToUpdate.details.join(',')
                    };
                } else {
                    console.error("No item passed!");
                }
                break;
            case 'create': //The form is empty by default
            default:
        }

        //Initializing the form
        this.computerForm = this.formBuilder.group({
            title:       [this.initialFormValues.title,       Validators.required],
            brand:       [this.initialFormValues.brand,       Validators.required],
            price:       [this.initialFormValues.price,       [Validators.required, Validators.pattern(ComputerFormComponent.pricePattern)]],
            image:       [this.initialFormValues.image,       [Validators.required, Validators.pattern(ComputerFormComponent.imageUrlPattern)]],
            description: [this.initialFormValues.description, Validators.required],
            details:     [this.initialFormValues.details,     [Validators.required, Validators.pattern(ComputerFormComponent.CSVPattern)]]
        });
    }

    ngOnDestroy(): void {
        this.computerForm = null;
    }

    private isValidFormField(field): boolean {
        return this.computerForm.controls[field].valid || (this.computerForm.controls[field].pristine && !this.isSubmitted);
    }

    private submit(): void {
        this.isSubmitted = true;

        if(this.computerForm.valid) {

            const formData = this.computerForm.value;

            const newComputer: Computer = Object.assign({}, formData, {
                details: formData.details.split(','),
                _id: this.action === 'update' ? this.itemToUpdate._id : Date.now(),
                date: Date.now()
            });

            //Emitting the event in here
            this.onSubmit.emit(newComputer);
        }
    }

    private cancel() {
        if (this.computerForm.pristine || confirm("Are you sure that you want to quit? All the data will be lost.")) {
            this.router.navigate(['/admin']);
        }
    }
}