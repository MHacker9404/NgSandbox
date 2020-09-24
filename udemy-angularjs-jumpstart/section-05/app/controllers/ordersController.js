(function () {
    // var OrdersController = function ($scope, $routeParams, customersFactory) {
    var OrdersController = function ($scope, $routeParams, customersService) {
        var customerId = $routeParams.customerId;
        $scope.orders = [];

        // $scope.customer = customersFactory.getCustomer(customerId);
        customersService.getCustomer(customerId).then(
            (response) => ($scope.customer = response.data),
            (data, status, headers, config) => console.error(data, status, headers, config)
        );
    };

    // OrdersController.$inject = ['$scope', '$routeParams', 'customersFactory'];
    OrdersController.$inject = ['$scope', '$routeParams', 'customersService'];

    angular.module('customersApp').controller('OrdersController', OrdersController);
})();
