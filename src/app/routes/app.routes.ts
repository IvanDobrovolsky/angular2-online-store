import { RouterConfig, provideRouter } from '@angular/router';

//Application components
import { HomePageComponent }           from './../components/pages/home/home-page.component';
import { CatalogPageComponent }        from '../components/pages/catalog/catalog-page.component';
import { CatalogItemPreviewComponent } from './../components/pages/catalog/catalog-item-preview/catalog-item-preview.component';
import { ShoppingCartComponent }       from './../components/pages/shopping-cart/shopping-cart-page.component';
import { AdminPageComponent }          from './../components/pages/admin/admin-page.component';
import { AdminStoreComponent }         from './../components/pages/admin/store/admin-store.component';
import { AdminCreateComponent }        from './../components/pages/admin/create/admin-create.component';
import { AdminEditComponent }          from './../components/pages/admin/edit/admin-edit.component';
import { PageNotFoundComponent }       from './../components/pages/404/404-page.component';

//Application routes
const routes: RouterConfig = [
    { path: '',            component: HomePageComponent },
    { path: 'catalog',     component: CatalogPageComponent },
    { path: 'catalog/:id', component: CatalogItemPreviewComponent },
    { path: 'cart',        component: ShoppingCartComponent },
    { path: 'admin',       
      component: AdminPageComponent,
      children: [
         { path: '',         component: AdminStoreComponent },
         { path: 'create',   component: AdminCreateComponent },
         { path: 'edit/:id', component: AdminEditComponent },
        ]},
    { path: '**',          component: PageNotFoundComponent }
];

export const appRouterProviders = [
    provideRouter(routes)
];