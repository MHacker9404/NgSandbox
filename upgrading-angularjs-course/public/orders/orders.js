(function () {
    'use strict';
    controller.$inject = ['$scope', 'orderService', 'customerService'];
    function controller($scope, orderService, customerService) {
        $scope.title = 'Orders';

        activate();

        function activate() {
            $scope.customers = customerService.getCustomers();
            $scope.orders = orderService.getOrders();
            $scope.orders.forEach(function (order) {
                var customer = _.find($scope.customers, function (customer) {
                    return order.customerId === customer.id;
                });
                order.customerName = customer.fullName;
            });
        }
    }

    angular.module('app').controller('ordersController', controller);
})();
