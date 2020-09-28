(function () {
    'use strict';

    angular.module('app').controller('productDetailController', [
        '$scope',
        'product',
        function ($scope, product) {
            $scope.title = 'Product Detail';
            $scope.product = product;
        },
    ]);
})();
