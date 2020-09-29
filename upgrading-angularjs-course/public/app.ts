import * as angular from 'angular';
import 'angular-route';

import { HomeComponent } from './home/home';
import { CustomersComponent } from './customers/customers';
import { CustomersService } from './customers/customerService';

angular.module('app', ['ngRoute']);
angular.module('app').service('customerService', CustomersService);
angular.module('app').component('home', HomeComponent);
angular.module('app').component('customers', CustomersComponent);
