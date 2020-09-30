import moment from 'moment';

// (function(){
//     'use strict';

function controller(addressService: any, orderService: any) {
    var vm = this;
    vm.title = 'Customer Detail';
    vm.customer = this.customer;

    vm.$onInit = () => {
        vm.address = addressService.getFullAddress(vm.customer);
        orderService.getOrdersByCustomer(vm.customer.id).then((data: any) => {
            vm.orders = data;
            vm.orders.forEach((order: any) => (order.orderDate = moment(order.orderDate).format('MM/DD/YYYY')));
        });
    };

    vm.updateDiscount = (discount: any) => (vm.customer.discount = discount);
}

controller.$inject = ['addressService', 'orderService'];

const template = require('./customerDetail.html');

const component = {
    // templateUrl: './customerDetail/customerDetail.html',
    template: template,
    bindings: {
        customer: '<',
    },
    controller: controller,
};
export { component as CustomerDetailsComponent };

// angular.module('app').component('customerDetail', customerDetailComponent);
// })();
