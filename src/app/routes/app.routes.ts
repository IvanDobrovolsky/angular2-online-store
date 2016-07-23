import { RouterConfig, provideRouter } from '@angular/router';

//Application components
import { HomePageComponent }     from './../components/pages/home/home-page.component';
import { CatalogPageComponent }  from '../components/pages/catalog/catalog-page.component';
import { CatalogItemPreview }    from './../components/pages/catalog/catalog-item-preview/catalog-item-preview.component';
import { ShoppingCartComponent } from './../components/pages/shopping-cart/shopping-cart-page.component';
import { PageNotFoundComponent } from './../components/pages/404/404-page.component';

//Application routes
const routes: RouterConfig = [
    { path: '',            component: HomePageComponent },
    { path: 'catalog',     component: CatalogPageComponent },
    { path: 'catalog/:id', component: CatalogItemPreview },
    { path: 'cart',        component: ShoppingCartComponent },
    { path: '**',          component: PageNotFoundComponent }
];

export const appRouterProviders = [
    provideRouter(routes)
];