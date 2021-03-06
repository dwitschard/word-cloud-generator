import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import {RemoteEntryModule} from "./remote-entry/remote-entry.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RemoteEntryModule,
    RouterModule.forRoot([
      {
        path: '',
        loadChildren: () => import('./remote-entry/remote-entry.module').then((m) => m.RemoteEntryModule),
      }
    ], { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
