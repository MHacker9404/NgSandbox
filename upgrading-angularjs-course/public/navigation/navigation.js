(function () {
    'use strict';

    function controller() {
        const vm = this;

        vm.$onInit = function () {
            vm.companyName = 'Awesome, Inc';
        };
    }

    const component = {
        templateUrl: './navigation/navigation.html',
        bindings: {},
        controller: controller,
    };

    angular.module('app').component('navigation', component);
})();
