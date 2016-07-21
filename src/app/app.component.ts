import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HTTP_PROVIDERS}                        from '@angular/http';

import { ApiService } from './services/api.service';

import { Computer } from './models/computer.model';

@Component({
  moduleId: module.id,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'app',
  templateUrl: 'app.component.html',
  styleUrls: [
    'app.component.css'
  ],
  providers: [
    HTTP_PROVIDERS,
      ApiService
  ]
})
export class AppComponent implements OnInit{

  title = 'angular2-online-store works!';

  private computers: Array<Computer>;

  constructor(private apiService: ApiService){}

  ngOnInit(){
    this.apiService
      .getData()
      .subscribe(response => {
              this.computers = response.data;
              console.log(this.computers);
          },
        error => console.error(`An error has occurred! ${error}`));
  }
}
