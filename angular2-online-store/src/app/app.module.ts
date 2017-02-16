import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import * as components from './components';

@NgModule({
  declarations: [
    //app
    components.AppComponent,

    //pages
    components.AdminCreateComponent,
    components.AdminEditComponent,
    components.AdminPageComponent,
    components.AdminStoreComponent,
    components.CatalogFiltersComponent,
    components.CatalogItemComponent,
    components.CatalogItemPreviewComponent,
    components.CatalogPageComponent,
    components.PageNotFoundComponent,
    components.HomePageComponent,
    components.ShoppingCartComponent,
    components.ShoppingCartItemComponent,

    //shared
    components.NavigationComponent,
    components.ComputerFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [components.AppComponent]
})
export class AppModule { }
