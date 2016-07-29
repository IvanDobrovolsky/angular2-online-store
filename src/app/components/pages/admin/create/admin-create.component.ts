import {Component, ViewEncapsulation, OnInit, OnDestroy}              from '@angular/core';
import {FormGroup, FormBuilder, REACTIVE_FORM_DIRECTIVES, Validators} from '@angular/forms';
import { NgClass }                                                    from '@angular/common';

@Component({
    moduleId: module.id,
    encapsulation: ViewEncapsulation.Emulated,
    selector: 'admin-create',
    templateUrl: 'admin-create.component.html',
    styleUrls: [
        'admin-create.component.css'
    ],
    directives: [
        REACTIVE_FORM_DIRECTIVES,
        NgClass
    ],
    providers: []
})
export class AdminCreateComponent{


    private computerForm: FormGroup;
    private isSubmitted = false;

    private static pricePattern = "^([1-9]|[0-9][0-9]|[0-9][0-9][0-9]|[0-9][0-9][0-9][0-9])$";
    private static imageUrlPattern = "^http?:\/\/[^\s]+(?=.(jpe?g|png|gif)).(jpe?g|png|gif)$";
    
    constructor(private formBuilder: FormBuilder) {

    }
    
    ngOnInit(): void {
        this.computerForm = this.formBuilder.group({
            title:       ['', Validators.required],
            brand:       ['', Validators.required],
            price:       ['', [Validators.required, Validators.pattern(AdminCreateComponent.pricePattern)]],
            image:       ['', [Validators.required, Validators.pattern(AdminCreateComponent.imageUrlPattern)]],
            description: ['', Validators.required],
            details:     ['', Validators.required]
        });
    }

    ngOnDestroy(): void {
        this.computerForm = null;
    }

    private isValidFormField(field): boolean {
        return this.computerForm.controls[field].valid || (this.computerForm.controls[field].pristine && !this.isSubmitted);
    }

    private add(): void {
        this.isSubmitted = true;

        if(this.computerForm.valid) {
            //TODO make api call here
        }
    }

    //TODO implement cancel method
}