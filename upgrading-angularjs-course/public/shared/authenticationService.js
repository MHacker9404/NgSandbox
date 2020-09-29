//We don't need or use this authentication service,
//it's just here to illustrate shared services.
(function () {
    'use strict';

    service.$inject = [];
    function service() {
        const vm = this;

        vm.authenticate = function () {
            return true;
        };

        return vm;
    }

    angular.module('app').service('authenticationService', service);
})();
