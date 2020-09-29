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

const component = {
    templateUrl: './customers/customers.html',
    bindings: {},
    controller: controller,
};

// angular.module('app').component('customers', component);
// })();
export { component as CustomersComponent };
