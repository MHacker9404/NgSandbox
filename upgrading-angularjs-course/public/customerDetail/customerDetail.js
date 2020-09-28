(function () {
    'use strict';

    controller.$inject = ['addressFactory', 'orderService'];
    function controller(addressFactory, orderService) {
        const vm = this;

        vm.title = 'Customer Detail';
        vm.customer = this.customer;
        vm.discountTemplate = '../customerDetail/discount.html';

        vm.$onInit = function () {
            vm.address = addressFactory.getFullAddress(vm.customer);
            vm.orders = orderService.getOrdersByCustomer(vm.customer.id);
            vm.orders.forEach(function (order) {
                order.orderDate = moment(order.orderDate).format('MM/DD/YYYY');
            });
        };
    }

    const component = {
        templateUrl: './customerDetail/customerDetail.html',
        bindings: {
            customer: '<',
        },
        controller: controller,
    };

    angular.module('app').component('customerDetail', component);
})();
