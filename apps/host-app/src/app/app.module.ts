import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { WelcomeContainerComponent } from './containers/welcome-container/welcome-container.component';

@NgModule({
  declarations: [AppComponent, WelcomeContainerComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          component: WelcomeContainerComponent
        },
        {
          path: 'admin-app',
          loadChildren: () => loadRemoteModule({
            remoteEntry: 'http://localhost:5001/remoteEntry.js',
            remoteName: 'admin_app',
            exposedModule: './Module'
          }).then(m => m.RemoteEntryModule)
        }
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
