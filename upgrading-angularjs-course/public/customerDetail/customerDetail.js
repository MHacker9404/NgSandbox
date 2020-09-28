(function () {
    'use strict';

    controller.$inject = ['$scope', 'customer', 'addressFactory', 'orderService'];
    function controller($scope, customer, addressFactory, orderService) {
        $scope.title = 'Customer Detail';
        $scope.discountTemplate = '../templates/discount.html';
        $scope.customer = customer;
        $scope.address = addressFactory.getFullAddress(customer);

        activate();

        function activate() {
            $scope.orders = orderService.getOrdersByCustomer($scope.customer.id);
            $scope.orders.forEach(function (order) {
                order.orderDate = moment(order.orderDate).format('MM/DD/YYYY');
            });
        }
    }

    angular.module('app').controller('customerDetailController', controller);
})();
