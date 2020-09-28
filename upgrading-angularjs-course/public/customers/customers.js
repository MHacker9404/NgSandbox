(function () {
    'use strict';

    controller.$inject = ['$scope', 'customerService'];
    function controller($scope, customerService) {
        // const vm = this;
        $scope.title = 'Customers';

        activate();

        function activate() {
            $scope.customers = customerService.getCustomers();
        }
    }

    angular.module('app').controller('customersController', controller);
})();
