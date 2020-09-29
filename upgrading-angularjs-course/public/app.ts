import * as angular from 'angular';
import 'angular-route';

import hashPrefixConfig from './config.hash-prefx';
import routeProviderConfig from './config.routes';

import { HomeComponent } from './home/home';
import { CustomersComponent } from './customers/customers';
import { CustomerService } from './customers/customerService';
import { CustomerDetailsComponent } from './customerDetail/customerDetail';
import { AddressService } from './shared/addressService';

angular
    .module('app', ['ngRoute'])
    .config(hashPrefixConfig)
    .config(routeProviderConfig)
    .service('customerService', CustomerService)
    .service('addressService', AddressService)
    .component('home', HomeComponent)
    .component('customers', CustomersComponent)
    .component('customerDetail', CustomerDetailsComponent);
