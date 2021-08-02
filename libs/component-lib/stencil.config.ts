import { Config } from '@stencil/core';
import { angularOutputTarget } from '@stencil/angular-output-target';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'component-lib',
  taskQueue: 'async',
  outputTargets: [
    angularOutputTarget({
      componentCorePackage: 'component-lib',
      directivesProxyFile:
        '../../generated/component-lib-angular/src/components.ts',
    }),
    {
      type: 'dist',
      esmLoaderPath: './loader',
      dir: '../../dist/libs/component-lib/dist',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      dir: '../../dist/libs/component-lib/www',
      serviceWorker: null, // disable service workers
    },
  ],

  plugins: [sass()],
};
