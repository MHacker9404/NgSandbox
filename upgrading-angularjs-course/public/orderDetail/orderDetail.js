(function () {
    'use strict';

    controller.$inject = ['$scope', 'order', 'productService', 'customerService'];

    function controller($scope, order, productService, customerService) {
        $scope.title = 'Order Detail';
        $scope.order = order;

        activate();

        function activate() {
            var products = productService.getProducts();
            $scope.customer = customerService.getCustomer($scope.order.customerId);
            $scope.order.items.forEach(function (item) {
                var product = _.find(products, function (product) {
                    return product.id === item.productId;
                });
                item.productName = product.name;
                item.itemPrice = item.quantity * product.price;
            });
        }
    }

    angular.module('app').controller('orderDetailController', controller);
})();
