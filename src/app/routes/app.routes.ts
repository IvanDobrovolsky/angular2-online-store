import { RouterConfig, provideRouter } from '@angular/router';

//Application components
import { HomePageComponent }     from './../components/pages/home/home-page.component';
import { MainPageComponent }     from './../components/pages/main/main-page.component';
import { PageNotFoundComponent } from './../components/pages/404/404-page.component';

//Application routes
const routes: RouterConfig = [
    { path: '',     component: HomePageComponent },
    { path: 'main', component: MainPageComponent },
    { path: '**',   component: PageNotFoundComponent}
];

export const appRouterProviders = [
    provideRouter(routes)
];