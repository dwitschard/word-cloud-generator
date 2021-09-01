import { Component } from '@angular/core';

@Component({
  selector: 'adm-word-cloud-generator-admin-app-entry',
  template: `
    <div class="remote-entry">
      <adm-app-word-form></adm-app-word-form>
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
