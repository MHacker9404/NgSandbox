(function () {
    'use strict';

    function controller() {
        const vm = this;

        vm.$onInit = function () {};
    }

    const component = {
        templateUrl: './customers/customers-table.html',
        bindings: {
            customers: '<',
        },
        controller: controller,
    };

    angular.module('app').component('customersTable', component);
})();
