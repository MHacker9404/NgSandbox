import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { BreezeBridgeAngularModule } from 'breeze-bridge-angular';

import { BreezeJSRoutingModule } from './breeze-js-routing.module';
import { BaseComponent } from './base/base.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomersListItemComponent } from './customers-list-item/customers-list-item.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { orderitemsconcatproductspipe } from './services/orderitemsconcatproducts.pipe';
import { OrderComponent } from './order/order.component';
import { ProductListComponent } from './product-list/product-list.component';
import { DataFieldComponent } from './data-field/data-field.component';
import { ModalModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { ZzaDataService } from './services/zza-data.service';
import { InitGuard } from './services/init.guard';
import { CanDeactivateGuard } from './services/can-deactivate.guard';
import { NamingConvention } from 'breeze-client';

@NgModule({
  declarations: [
    BaseComponent,
    CustomerListComponent,
    CustomersListItemComponent,
    CustomerDetailComponent,
    orderitemsconcatproductspipe,
    OrderComponent,
    ProductListComponent,
    DataFieldComponent
  ],
  imports: [
    CommonModule,
    BreezeJSRoutingModule,
    ModalModule.forRoot(),
    FormsModule,
    HttpModule,
    BreezeBridgeAngularModule
  ],
  providers: [ZzaDataService, InitGuard, CanDeactivateGuard]
})
export class BreezeJSModule {
  constructor() {
    NamingConvention.camelCase.setAsDefault();
  }
}
