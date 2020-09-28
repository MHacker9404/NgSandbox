(function () {
    'use strict';

    controller.$inject = ['$scope', 'product'];

    function controller($scope, product) {
        $scope.title = 'Product Detail';
        $scope.product = product;
    }

    angular.module('app').controller('productDetailController', controller);
})();
