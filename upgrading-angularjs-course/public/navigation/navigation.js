(function () {
    'use strict';

    function directive() {
        return {
            restrict: 'E',
            templateUrl: '../navigation/navigation.html',
            link: function (scope, element, attrs, ctrl) {},
        };
    }

    angular.module('app').directive('navigation', directive);
})();
