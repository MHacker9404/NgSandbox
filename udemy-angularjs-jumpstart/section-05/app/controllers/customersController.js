(function () {
    // var CustomersController = function ($scope, customersFactory) {
    var CustomersController = function ($scope, customersService, appSettings) {
        $scope.sortBy = 'name';
        $scope.reverse = false;
        $scope.customers = [];
        $scope.title = appSettings.title;

        customersService.getCustomers().then(
            (response) => ($scope.customers = response.data),
            (data, status, headers, config) => console.error(data, status, headers, config)
        );

        $scope.doSort = function (propName) {
            $scope.sortBy = propName;
            $scope.reverse = !$scope.reverse;
        };
    };

    // CustomersController.$inject = ['$scope', 'customersFactory'];
    CustomersController.$inject = ['$scope', 'customersService', 'appSettings'];

    angular.module('customersApp').controller('CustomersController', CustomersController);
})();
