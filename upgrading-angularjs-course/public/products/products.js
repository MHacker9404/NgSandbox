(function () {
    'use strict';

    controller.$inject = ['$scope', 'productService'];

    function controller($scope, productService) {
        $scope.title = 'Products';

        activate();

        function activate() {
            $scope.products = productService.getProducts();
        }
    }

    angular.module('app').controller('productsController', controller);
})();
