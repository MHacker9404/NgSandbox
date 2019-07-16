import {HttpClientModule} from '@angular/common/http';
import {NgModule, APP_INITIALIZER} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {Log4aModule, AppenderService, Log4a} from '@ng-log/log4a';

@NgModule({
  declarations: [AppComponent],
  imports: [
  BrowserModule,
  AppRoutingModule,
  HttpClientModule,
  Log4aModule,
  SharedModule,
  ],
  providers: [
  AppenderService,
  Log4a,
  {
  provide: APP_INITIALIZER,
  useFactory: (config: Log4a) => () => config.loadConfigs(),
  deps: [Log4a],
  multi: true,
  },
  ],
  bootstrap: [AppComponent],
  })
export class AppModule {}
