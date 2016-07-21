import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { HTTP_PROVIDERS }                                  from '@angular/http';
import { ROUTER_DIRECTIVES }                               from '@angular/router';

import { NavigationComponent } from './common/navigation/navigation.component';

import { ApiService } from './../services/api.service';

import { Computer } from './../models/computer.model';

@Component({
  moduleId: module.id,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'app',
  templateUrl: 'app.component.html',
  styleUrls: [
    'app.component.css'
  ],
  directives: [
    ROUTER_DIRECTIVES,
    NavigationComponent
  ],
  providers: [
    HTTP_PROVIDERS,
    ApiService
  ]
})
export class AppComponent implements OnInit, OnDestroy{

  private computers: Array<Computer>;

  constructor(private apiService: ApiService){}

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
