import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';
import { WordCloudComponent } from '../container/word-cloud/word-cloud.component';

@NgModule({
  declarations: [RemoteEntryComponent, WordCloudComponent],
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
