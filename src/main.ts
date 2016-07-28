import { bootstrap }                            from '@angular/platform-browser-dynamic';
import { enableProdMode }                       from '@angular/core';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

import { AppComponent }   from './app/components/app.component';
import { environment}     from './app/environment';

import { appRouterProviders } from './app/routes/app.routes';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
    appRouterProviders,
    disableDeprecatedForms(),
    provideForms()
]);

