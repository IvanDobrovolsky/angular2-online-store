import { RouterConfig, provideRouter } from '@angular/router';

//Application components
import { HomePageComponent }     from './../components/pages/home/home-page.component';
import { MainPageComponent } from './../components/pages/main/main-page.component';

const routes: RouterConfig = [
    { path: '', component: HomePageComponent },
    { path: 'main',   component: MainPageComponent }
];

export const appRouterProviders = [
    provideRouter(routes)
];