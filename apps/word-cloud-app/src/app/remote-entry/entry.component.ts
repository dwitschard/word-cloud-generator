import { Component } from '@angular/core';

@Component({
  selector: 'adm-word-cloud-generator-app-entry',
  template: `<div class="remote-entry">
    <word-cloud-generator-word-cloud></word-cloud-generator-word-cloud>
    <stencil-header header='Angular meets Stencil!'></stencil-header>
  </div>`,
  styles: [
    `
      .remote-entry {
        background-color: #143055;
        color: white;
        padding: 5px;
      }
    `,
  ],
})
export class RemoteEntryComponent {}
