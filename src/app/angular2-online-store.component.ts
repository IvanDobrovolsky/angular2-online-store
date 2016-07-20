import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from './services/api.service';
import { HTTP_PROVIDERS}    from '@angular/http';

@Component({
  moduleId: module.id,
  //encapsulate: ViewEncapsulation.Emulated,
  selector: 'angular2-online-store-app',
  templateUrl: 'angular2-online-store.component.html',
  styleUrls: [
    'angular2-online-store.component.css'
  ],
  providers: [
    HTTP_PROVIDERS, ApiService
  ]
})
export class Angular2OnlineStoreAppComponent implements OnInit{

  title = 'angular2-online-store works!';
  private computers = [];

  constructor(private apiService: ApiService){}

  ngOnInit(){
    this.apiService
      .getPosts()
      .subscribe(computers => this.computers = computers,
        error => console.error(`An error has occurred! ${error}`));
  }
}
