(function () {
    'use strict';

    angular.module('app').config([
        '$locationProvider',
        function ($locationProvider) {
            $locationProvider.hashPrefix('');
        },
    ]);

    angular.module('app').config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: './templates/home.html',
                    controller: 'homeController',
                })
                .when('/customers', {
                    templateUrl: './customers/customers.html',
                    controller: 'customersController',
                })
                .when('/orders', {
                    templateUrl: './orders/orders.html',
                    controller: 'ordersController',
                })
                .when('/products', {
                    templateUrl: './products/products.html',
                    controller: 'productsController',
                })
                .when('/customers/:id', {
                    templateUrl: './templates/customerDetail.html',
                    controller: 'customerDetailController',
                    resolve: {
                        customer: [
                            '$route',
                            'customerService',
                            function ($route, customerService) {
                                var id = parseInt($route.current.params.id);
                                return customerService.getCustomer(id);
                            },
                        ],
                    },
                })
                .when('/orders/:id', {
                    templateUrl: './templates/orderDetail.html',
                    controller: 'orderDetailController',
                    resolve: {
                        order: [
                            '$route',
                            'orderService',
                            function ($route, orderService) {
                                var id = parseInt($route.current.params.id);
                                return orderService.getOrder(id);
                            },
                        ],
                    },
                })
                .when('/products/:id', {
                    templateUrl: './templates/productDetail.html',
                    controller: 'productDetailController',
                    resolve: {
                        product: [
                            '$route',
                            'productService',
                            function ($route, productService) {
                                var id = parseInt($route.current.params.id);
                                return productService.getProduct(id);
                            },
                        ],
                    },
                });
        },
    ]);
})();
