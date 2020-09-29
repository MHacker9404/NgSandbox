import * as angular from 'angular';
import 'angular-route';

import { HomeComponent } from './home/home';
import { CustomersComponent } from './customers/customers';
import { CustomerService } from './customers/customerService';
import { CustomerDetailsComponent } from './customerDetail/customerDetail';
import { AddressService } from './shared/addressService';

angular
    .module('app', ['ngRoute'])
    .service('customerService', CustomerService)
    .service('addressService', AddressService)
    .component('home', HomeComponent)
    .component('customers', CustomersComponent)
    .component('customerDetail', CustomerDetailsComponent);
