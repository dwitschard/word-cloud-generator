import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import {WordFormComponent} from "./word-form/word-form.component";
import { ReactiveFormsModule } from "@angular/forms";

import { environment } from '../environments/environment';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {WordsService} from "./words.service";
// import {WordListComponent} from "./word-list/word-list.component";

@NgModule({
  declarations: [AppComponent, WordFormComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: '',
        loadChildren: () => import('./remote-entry/entry.module').then((m) => m.RemoteEntryModule),
      },
    ], {initialNavigation: 'enabledBlocking'}),
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [WordsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
