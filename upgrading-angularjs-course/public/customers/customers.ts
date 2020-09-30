// (function () {
// 'use strict';

function controller(customerService: any) {
    const vm = this;
    vm.title = 'Customers';

    vm.$onInit = () => {
        customerService.getCustomers().then((data) => (vm.customers = data));
    };
}

controller.$inject = ['customerService'];

const template = require('./customers.html');

const component = {
    // templateUrl: './customers/customers.html',
    template: template,
    bindings: {},
    controller: controller,
};

// angular.module('app').component('customers', component);
// })();
export { component as CustomersComponent };
