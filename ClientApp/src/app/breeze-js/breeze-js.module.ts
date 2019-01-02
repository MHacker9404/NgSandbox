import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreezeJSRoutingModule } from './breeze-js-routing.module';
import { BaseComponent } from './base/base.component';

@NgModule({
  declarations: [BaseComponent],
  imports: [
    CommonModule,
    BreezeJSRoutingModule
  ]
})
export class BreezeJSModule { }
