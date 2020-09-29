(function () {
    'use strict';

    controller.$inject = ['customerService'];
    function controller(customerService) {
        var vm = this;
        vm.title = 'Customers';

        vm.$onInit = function () {
            vm.customers = customerService.getCustomers();
        };
    }

    const component = {
        templateUrl: './customers/customers.html',
        bindings: {},
        controller: controller,
    };

    angular.module('app').component('customers', component);
})();
