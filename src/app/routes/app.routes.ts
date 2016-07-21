import { RouterConfig, provideRouter } from '@angular/router';

//Application components
import { HomePageComponent }     from './../components/pages/home/home-page.component';
import { CatalogPageComponent }     from '../components/pages/catalog/catalog-page.component';
import { PageNotFoundComponent } from './../components/pages/404/404-page.component';

//Application routes
const routes: RouterConfig = [
    { path: '',        component: HomePageComponent },
    { path: 'catalog', component: CatalogPageComponent },
    { path: '**',      component: PageNotFoundComponent}
];

export const appRouterProviders = [
    provideRouter(routes)
];