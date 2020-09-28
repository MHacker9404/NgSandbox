(function () {
    'use strict';

    controller.$inject = ['$scope'];
    function controller($scope) {
        $scope.title = 'Awesome, Inc. Internal Ordering System';
    }

    angular.module('app').controller('homeController', controller);
})();
