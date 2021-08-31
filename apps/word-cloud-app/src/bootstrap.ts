import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Note: loader import location set using "esmLoaderPath" within the output target config
import { applyPolyfills, defineCustomElements } from '@word-cloud-generator/component-lib/loader';

/**
 * TODO Registration of Stencil Components
 * In order to register the stencil component library we need to initialize it here.
 * However this file only is used when using the admin-app in standalone mode.
 * To make it work in a MFE-Environment, we also have to register the stencil
 * components in ~/apps/host-app/src/bootstrap.ts
 *
 * TODO Let's check if this is could be done better during the camp!
 */
applyPolyfills().then(() => {
  defineCustomElements()
})

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
