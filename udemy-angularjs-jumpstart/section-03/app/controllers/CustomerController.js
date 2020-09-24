/*
function CustomerController($scope) {
    $scope.sortBy = 'name';
    $scope.reverse = false;

    $scope.customers = [
        { joined: '2000-12-02', name: 'John', city: 'Chandler', orderTotal: 9.9956 },
        { joined: '1965-01-25', name: 'Zed', city: 'Las Vegas', orderTotal: 19.99 },
        { joined: '1944-06-15', name: 'Tina', city: 'New York', orderTotal: 44.99 },
        { joined: '1995-03-28', name: 'Dave', city: 'Seattle', orderTotal: 101.5 },
    ];

    $scope.doSort = function (propName) {
        $scope.sortBy = propName;
        $scope.reverse = !$scope.reverse;
    };
}
*/

/*
//  for controller as
function CustomerController() {
    this.sortBy = 'name';
    this.reverse = false;

    this.customers = [
        { joined: '2000-12-02', name: 'John', city: 'Chandler', orderTotal: 9.9956 },
        { joined: '1965-01-25', name: 'Zed', city: 'Las Vegas', orderTotal: 19.99 },
        { joined: '1944-06-15', name: 'Tina', city: 'New York', orderTotal: 44.99 },
        { joined: '1995-03-28', name: 'Dave', city: 'Seattle', orderTotal: 101.5 },
    ];

    this.doSort = function (propName) {
        this.sortBy = propName;
        this.reverse = !this.reverse;
    };
}
*/
(function () {
    const CustomerController = function ($scope) {
        $scope.sortBy = 'name';
        $scope.reverse = false;

        $scope.customers = [
            { joined: '2000-12-02', name: 'John', city: 'Chandler', orderTotal: 9.9956 },
            { joined: '1965-01-25', name: 'Zed', city: 'Las Vegas', orderTotal: 19.99 },
            { joined: '1944-06-15', name: 'Tina', city: 'New York', orderTotal: 44.99 },
            { joined: '1995-03-28', name: 'Dave', city: 'Seattle', orderTotal: 101.5 },
        ];

        $scope.doSort = function (propName) {
            $scope.sortBy = propName;
            $scope.reverse = !$scope.reverse;
        };
    };

    //  2 ways to handle DI with minification
    CustomerController.$inject = ['$scope'];
    angular.module('app-module').controller('CustomerController', CustomerController);

    // angular.module('app-module').controller('CustomerController', ['$scope',CustomerController]);
})();
