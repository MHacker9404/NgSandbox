(function () {
    'use strict';

    function controller(addressFactory, orderService) {
        const vm = this;
        vm.customer = this.customer;
        vm.$onInit = function () {};
    }

    const component = {
        templateUrl: './customerDetail/discount.html',
        bindings: {
            customer: '<',
        },
        controller: controller,
    };

    angular.module('app').component('discount', component);
})();
