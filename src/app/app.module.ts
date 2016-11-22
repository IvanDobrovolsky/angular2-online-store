import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

//TODO Add comments and organize the structure
import { AppComponent } from './components/app.component';
import { routing } from './app.routing';

import { NavigationComponent } from './components/shared/navigation/navigation.component';

import { ComputerFormComponent } from './components/shared/forms/computer-form/computer-form.component';


//Application components
import { HomePageComponent }           from './components/pages/home/home-page.component';
import { CatalogPageComponent }        from './components/pages/catalog/catalog-page.component';
import { CatalogItemComponent}         from './components/pages/catalog/catalog-item/catalog-item.component';
import { CatalogFiltersComponent }     from './components/pages/catalog/catalog-filters/catalog-filters.component';
import { CatalogItemPreviewComponent } from './components/pages/catalog/catalog-item-preview/catalog-item-preview.component';
import { ShoppingCartComponent }       from './components/pages/shopping-cart/shopping-cart-page.component';
import { ShoppingCartItemComponent }   from './components/pages/shopping-cart/shopping-cart-item/shopping-cart-item.component';
import { AdminPageComponent }          from './components/pages/admin/admin-page.component';
import { AdminStoreComponent }         from './components/pages/admin/store/admin-store.component';
import { StoreItemComponent }          from './components/pages/admin/store/store-item/store-item.component';
import { AdminCreateComponent }        from './components/pages/admin/create/admin-create.component';
import { AdminEditComponent }          from './components/pages/admin/edit/admin-edit.component';
import { PageNotFoundComponent }       from './components/pages/404/404-page.component';


import {
    ApiService,
    NotificationService,
    ShoppingCartService,
    SubscriptionService
}  from './services/index';

@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        ComputerFormComponent,

        //Application components
        HomePageComponent,
        CatalogPageComponent,
        CatalogItemComponent,
        CatalogFiltersComponent,
        CatalogItemPreviewComponent,
        ShoppingCartComponent,
        ShoppingCartItemComponent,
        AdminPageComponent,
        AdminStoreComponent,
        StoreItemComponent,
        AdminCreateComponent,
        AdminEditComponent,
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        RouterModule,
        routing
    ],
    providers: [
        ApiService,
        NotificationService,
        ShoppingCartService,
        SubscriptionService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
