import { Component } from '@angular/core';

@Component({
  selector: 'adm-word-cloud-generator-app-entry',
  template: `<div class="remote-entry">
    <word-cloud-generator-word-cloud></word-cloud-generator-word-cloud>
  </div>`,
  styles: [
    `
      .remote-entry {
        background-color: #143055;
        color: white;
        padding: 5px;
        display: block;
        font-family: sans-serif;
        min-width: 300px;
        max-width: 600px;
        margin: 50px auto;
      }
    `,
  ],
})
export class RemoteEntryComponent {}
