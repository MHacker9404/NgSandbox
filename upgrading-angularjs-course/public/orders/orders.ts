import _find from 'lodash/find';

function controller(orderService: any, customerService: any, $q: any) {
    var vm = this;
    vm.title = 'Orders';

    vm.$onInit = () => {
        let promises = [orderService.getOrders(), customerService.getCustomers()];
        return $q.all(promises).then((data: any) => {
            vm.orders = data[0];
            vm.customers = data[1];
            vm.orders.forEach((order: any) => {
                const customer = _find(vm.customers, (customer) => order.customerId === customer.id);
                order.customerName = customer.fullName;
            });
        });
    };
}

controller.$inject = ['orderService', 'customerService', '$q'];

const component = {
    templateUrl: './orders/orders.html',
    bindings: {},
    controller: controller,
};

export { component as OrdersComponent };
