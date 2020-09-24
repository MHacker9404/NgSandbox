(function () {
    var app = angular.module('customersApp', ['ngRoute']);

    // angular.module('customersApp').constant('appSettings', {
    //     title: 'Customers Application',
    //     version: '1.0',
    // });

    app.config([
        '$locationProvider',
        function ($locationProvider) {
            $locationProvider.hashPrefix('');
        },
    ]);

    app.config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/', {
                    controller: 'CustomersController',
                    templateUrl: 'app/views/customers.html',
                })
                .when('/orders/:customerId', {
                    controller: 'OrdersController',
                    templateUrl: 'app/views/orders.html',
                })
                .otherwise({ redirectTo: '/' });
        },
    ]);

    app.config([
        'appSettings',
        function (appSettings) {
            console.log(appSettings);
        },
    ]);
})();
