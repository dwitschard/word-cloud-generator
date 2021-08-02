import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';

@NgModule({
  declarations: [RemoteEntryComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: RemoteEntryComponent,
      },
    ]),
  ],
  providers: [],
  // The CUSTOM_ELEMENTS_SCHEMA needs to be included in any module that uses custom elements.
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RemoteEntryModule {}
