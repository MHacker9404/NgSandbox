// (function () {
// 'use strict';

interface This {
    templateUrl: string;
    bindings: {};
    controller: () => void;
    $onInit: () => void;
    title: string;
    customers: any[];
}

function controller(this: This, customerService: any) {
    const vm = this;
    vm.title = 'Customers';

    vm.$onInit = () => (vm.customers = customerService.getCustomers());
}
controller.$inject = ['customerService'];

const component = {
    templateUrl: './customers/customers.html',
    bindings: {},
    controller: controller,
};

// angular.module('app').component('customers', component);
// })();
export { component as CustomersComponent };
