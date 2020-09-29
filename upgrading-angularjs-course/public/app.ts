import * as angular from 'angular';
import 'angular-route';

import 'jquery';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.css';

import hashPrefixConfig from './config.hash-prefx';
import routeProviderConfig from './config.routes';

import { CustomerService } from './customers/customerService';
import { AddressService } from './shared/addressService';
import { OrderService } from './orders/orderService';
import { ProductService } from './products/productService';

import { HomeComponent } from './home/home';
import { NavigationComponent } from './navigation/navigation';
import { CustomersComponent } from './customers/customers';
import { CustomerDetailsComponent } from './customerDetail/customerDetail';
import { CustomersTableComponent } from './customers/customers-table';
import { DiscountComponent } from './customerDetail/discount';
import { OrdersComponent } from './orders/orders';
import { OrderDetailComponent } from './orderDetail/orderDetail';
import { ProductsComponent } from './products/products';
import { ProductDetailComponent } from './productDetail/productDetail';

angular
    .module('app', ['ngRoute'])
    .config(hashPrefixConfig)
    .config(routeProviderConfig)
    .service('customerService', CustomerService)
    .service('addressService', AddressService)
    .service('orderService', OrderService)
    .service('productService', ProductService)
    .component('home', HomeComponent)
    .component('customers', CustomersComponent)
    .component('customerDetail', CustomerDetailsComponent)
    .component('customersTable', CustomersTableComponent)
    .component('discount', DiscountComponent)
    .component('orders', OrdersComponent)
    .component('orderDetail', OrderDetailComponent)
    .component('navigation', NavigationComponent)
    .component('products', ProductsComponent)
    .component('productDetail', ProductDetailComponent);
