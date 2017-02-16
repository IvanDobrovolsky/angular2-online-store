import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { appRoutes } from './app-routing.module';
import * as components from './.';
import * as services from './.';

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
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    services.ApiService,
    services.NotificationService,
    services.ShoppingCartService,
    services.SubscriptionService
  ],
  bootstrap: [components.AppComponent]
})
export class AppModule { }
