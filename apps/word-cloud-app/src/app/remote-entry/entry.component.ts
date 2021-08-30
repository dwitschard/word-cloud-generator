import { Component } from '@angular/core';

@Component({
  selector: 'adm-word-cloud-generator-app-entry',
  template: `<div class="remote-entry">
    <h2>word-cloud's Remote Entry Component</h2>
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
