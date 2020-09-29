(function () {
    'use strict';

    factory.$inject = [];
    function factory() {
        const vm = this;

        vm.getFullAddress = function (customer) {
            return customer.address1 + ', ' + customer.city + ', ' + customer.state + ' ' + customer.zip;
        };

        return vm;
    }

    angular.module('app').factory('addressFactory', factory);
})();
