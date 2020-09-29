(function () {
    'use strict';

    controller.$inject = [];
    function controller() {
        var vm = this;

        vm.companyName = 'Awesome, Inc.';
    }

    const component = {
        templateUrl: '../navigation/navigation.html',
        bindings: {},
        controller: controller,
    };

    angular.module('app').component('navigation', component);
})();
