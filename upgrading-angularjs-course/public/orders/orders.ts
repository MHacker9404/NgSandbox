import _find from 'lodash/find';

function controller(orderService: any, customerService: any) {
    var vm = this;
    vm.title = 'Orders';

    vm.$onInit = () => {
        vm.customers = customerService.getCustomers();
        vm.orders = orderService.getOrders();
        vm.orders.forEach(function (order) {
            const customer = _find(vm.customers, (customer: any) => order.customerId === customer.id);

            order.customerName = customer.fullName;
        });
    };
}

controller.$inject = ['orderService', 'customerService'];

const component = {
    templateUrl: './orders/orders.html',
    bindings: {},
    controller: controller,
};

export { component as OrdersComponent };
