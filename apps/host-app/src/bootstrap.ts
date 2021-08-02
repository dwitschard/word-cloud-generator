import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { applyPolyfills, defineCustomElements } from '@word-cloud-generator/component-lib/loader';

/**
 * TODO see comment in ~/apps/admin-app/src/bootstrap.ts
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
