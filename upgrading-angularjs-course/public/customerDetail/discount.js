(function () {
    'use strict';

    function controller(addressFactory, orderService) {
        const vm = this;
        // vm.customerDiscount = this.customerDiscount;
        // vm.update = this.update;

        vm.$onInit = function () {
            vm.editDiscount = false;
        };

        vm.editDiscountType = function () {
            vm.editDiscount = true;
        };

        vm.updateDiscountType = function () {
            vm.update({ discount: vm.selectedDiscount });
            vm.editDiscount = false;
        };

        vm.discounts = [
            {
                discountId: 1,
                discountPercent: 10,
                discountName: 'Employee',
            },
            {
                discountId: 2,
                discountPercent: 5,
                discountName: 'Friends & Family',
            },
            {
                discountId: 3,
                discountPercent: 20,
                discountName: 'Famous Drummer',
            },
        ];
    }

    const component = {
        templateUrl: './customerDetail/discount.html',
        bindings: {
            customerDiscount: '<',
            update: '&',
        },
        controller: controller,
    };

    angular.module('app').component('discount', component);
})();
